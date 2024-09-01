const fs = require('fs');
const path = require('path');
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('cloudinary').v2;

require('dotenv').config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET,
});

const storageAudio = new CloudinaryStorage({
    cloudinary,
    allowedFormats: ['mp3'],
    params: {
        folder: 'LearnEnglish/Audio',
    },
});

const uploadAudioCloud = multer({ storage: storageAudio }).array('audio');

const uploadToCloudinary = (req, res, next) => {
    uploadAudioCloud(req, res, (err) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        // Lưu các liên kết file lên Cloudinary vào req.body
        if (req.files) {
            req.body.fileLinks = req.files.map((file) => file.path); // Lấy URL của các file
        }

        next();
    });
};

module.exports = uploadToCloudinary;
