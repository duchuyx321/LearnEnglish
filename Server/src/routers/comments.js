const express = require('express');

const router = express.Router();

const CommentController = require('../app/controller/CommentController');
const { checkToken } = require('../app/middleware/checkToken');

// [GET]
router.get('/combined', CommentController.getComments);
// [POST]
router.post('/create', checkToken, CommentController.createComment);
module.exports = router;
