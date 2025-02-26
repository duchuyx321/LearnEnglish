const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

require('dotenv').config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET,
});

const storageAvatar = new CloudinaryStorage({
    cloudinary,
    allowedFormats: ['jpg', 'png'],
    params: {
        folder: 'LearnEnglish/Avatars',
    },
});
const storageCourse = new CloudinaryStorage({
    cloudinary,
    allowedFormats: ['jpg', 'png'],
    params: {
        folder: 'LearnEnglish/Courses',
    },
});
const storageLearnPath = new CloudinaryStorage({
    cloudinary,
    allowedFormats: ['jpg', 'png'],
    params: {
        folder: 'LearnEnglish/Learn-Path',
    },
});
const storageBlogs = new CloudinaryStorage({
    cloudinary,
    allowedFormats: ['jpg', 'png'],
    params: {
        folder: 'LearnEnglish/Blogs',
    },
});

const uploadAvatarCloud = multer({
    storage: storageAvatar,
});
const uploadCourseCloud = multer({ storage: storageCourse });
const uploadLearnPathCloud = multer({ storage: storageLearnPath });
const uploadBlogCloud = multer({ storage: storageBlogs });

module.exports = {
    uploadAvatarCloud,
    uploadCourseCloud,
    uploadLearnPathCloud,
    uploadBlogCloud,
};
