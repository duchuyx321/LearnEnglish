const Comments = require('../module/Comments');

class CommentController {
    // [GET] --/comments?page=1&limit=1&commentable_id = &commentable_type
    async getComments(req, res, next) {
        try {
            const { page, limit, commentable_id, commentable_type } = req.query;
            const skip = (page - 1) * limit;
            const comments = await Comments.find({
                commentable_id,
                commentable_type,
            })
                .skip(skip)
                .limit(limit);
            res.status(200).json({ data: comments });
        } catch (e) {
            res.status(500).json(e.message);
        }
    }
    // [POST] --/comments/create
    async createComment(req, res, next) {
        try {
            const userID = req.userID;
            const { commentContent, commentable_type, commentable_id } =
                req.body;
            const comment = new Comments({
                userID,
                commentContent,
                commentable_type,
                commentable_id,
            });
            await comment.save();
            res.status(200).json({ data: { message: 'created successfully' } });
        } catch (error) {
            res.status(502).json({ error: error.message });
        }
    }
}

module.exports = new CommentController();
