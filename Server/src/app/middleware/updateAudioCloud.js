const fs = require('fs');
const path = require('path');

const cloudinary = require('cloudinary').v2;

require('dotenv').config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET,
});

// Function to upload local file to Cloudinary
const uploadLocalFileToCloudinary = (filePath, folder) => {
    return new Promise((resolve, reject) => {
        cloudinary.uploader.upload(
            filePath,
            { folder: folder, resource_type: 'auto' }, // Tự động xác định loại file
            (error, result) => {
                if (error) {
                    return reject(error);
                }
                resolve(result);
            },
        );
    });
};

const uploadToCloudinary = async (req, res, next) => {
    try {
        // Tạo mảng lưu các promise upload
        const fileUploads = req.body.fileNames.map((fileName) => {
            // Xác định đường dẫn file từ thư mục public/audio
            const filePath = path.join(
                __dirname,
                '../../public/audio',
                fileName,
            );
            // Kiểm tra sự tồn tại của file
            if (!fs.existsSync(filePath)) {
                throw new Error(`File không tồn tại: ${filePath}`);
            }
            // Upload file lên Cloudinary
            return uploadLocalFileToCloudinary(
                filePath,
                'LearnEnglish/Audio',
            ).then((result) => {
                // Xóa file sau khi upload thành công
                if (fs.existsSync(filePath)) {
                    fs.unlinkSync(filePath);
                }
                return result;
            });
        });
        // Chờ tất cả các file upload xong
        const results = await Promise.all(fileUploads);

        // Lưu các URL của file trên Cloudinary vào req.body để sử dụng trong các middleware/controller tiếp theo
        req.body.fileLinks = results;

        next();
    } catch (error) {
        console.error('Lỗi khi upload file lên Cloudinary:', error);
        return res
            .status(500)
            .json({ error: 'Upload file thất bại, vui lòng thử lại.' });
    }
};

module.exports = { uploadToCloudinary };
