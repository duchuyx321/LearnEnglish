const express = require('express');

const router = express.Router();

const CommentController = require('../app/controller/CommentController');
const { checkToken } = require('../app/middleware/checkToken');

// [GET]
router.get('/combined', CommentController.getComments);
// [POST]
router.post('/create', checkToken, CommentController.createComment);
// [PUT]
router.put('/edit/:_id', checkToken, CommentController.editComment);
// [PATCH]
router.patch('/restore/:_id', checkToken, CommentController.restoreComment);
// [DELETE]
router.delete('/delete/:_id', checkToken, CommentController.deleteComment);
router.delete('/destroy/:_id', checkToken, CommentController.destroyComment);

module.exports = router;
