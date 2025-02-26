const express = require('express');

const router = express.Router();

const BlogController = require('../app/controller/BlogController');
const { checkToken } = require('../app/middleware/checkToken');
const { uploadBlogCloud } = require('../app/middleware/uploadCloudinary');
// [GET]
router.get('/combined', BlogController.getBlog);

// [POST]
router.post(
    '/create',
    uploadBlogCloud.single('image'),
    checkToken,
    BlogController.createBlog,
);
// [PUT]
router.put('/update/:_id', checkToken, BlogController.updateBlog);

module.exports = router;
