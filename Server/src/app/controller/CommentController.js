const Comments = require('../module/Comments');
const Profile = require('../module/Profile');
const Users = require('../module/Users');
class CommentController {
    // [GET] --/comments/combined?page=1&limit=1&commentable_id = &commentable_type
    async getComments(req, res, next) {
        try {
            const { page, limit, commentable_id, commentable_type } = req.query;
            console.log(page, limit, commentable_id, commentable_type);
            const skip = (page - 1) * limit;
            const comments = await Comments.find({
                commentable_id,
                commentable_type,
            })
                .skip(skip)
                .limit(limit);
            const listCommentPath = comments.map(async (item) => {
                const { userID, commentable_type } = item;
                const toastPath = await Comments.countDocuments({
                    commentable_id: userID,
                    commentable_type,
                });
                const itemProfile = await Profile.findOne({ userID });
                const itemUser = await Users.findOne({ _id: userID });
                return {
                    ...item._doc,
                    toastPath,
                    username: itemUser.username,
                    profile: itemProfile,
                };
            });
            const result = await Promise.all(listCommentPath);
            res.status(200).json({ data: result });
        } catch (e) {
            console.log(e);
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
    // [PUT] --/comments/edits/:_id
    async editComment(req, res, next) {
        try {
            const userID = req.userID;
            const { _id } = req.params;
            const { content } = req.body;
            if (!checkAuthor) {
                return res
                    .status(403)
                    .json({ error: 'you are not authentication' });
            }
            if (!content) {
                return res.status(402).json({ error: 'content is required' });
            }
            const checkAuthor = await Comments.findOne({ _id, userID });
            const edit = await Comments.updateOne(
                { _id },
                { commentContent: content },
            );
            return res
                .status(200)
                .json({ data: { edit, message: 'updated successfully' } });
        } catch (error) {
            res.status(502).json({ error: error.message });
        }
    }
    // [PATCH] --/comments/restore/_id
    async restoreComment(req, res, next) {
        try {
            const userID = req.userID;
            const { _id } = req.params;
            const checkAuthor = await Comments.findOne({ _id, userID });
            if (!checkAuthor) {
                return res
                    .status(402)
                    .json({ error: 'you are not authentication' });
            }
            await Comments.restore({ _id, userID });
            return res
                .status(200)
                .json({ data: { message: 'restore successfully' } });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    // [DELETE] --/comments/delete/:_id
    async deleteComment(req, res, next) {
        try {
            const role = req.role;
            const userID = req.userID;
            if (role !== 'admin') {
                const checkAuthor = await Comments.findOne({ _id, userID });
                if (!checkAuthor) {
                    return res
                        .status(403)
                        .json({ error: 'you are not authenticated' });
                }
            }
            await Comments.delete({ _id });
            return res
                .status(200)
                .json({ data: { message: 'delete successfully' } });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    // [DELETE] --/comments/destroy/:_id
    async destroyComment(req, res, next) {
        try {
            const role = req.role;
            const userID = req.userID;
            if (role !== 'admin') {
                const checkAuthor = await Comments.findOne({ _id, userID });
                if (!checkAuthor) {
                    return res.status(403).json({
                        data: { message: 'you are not authentication' },
                    });
                }
            }
            await Comments.deleteOne({ _id });
            return res
                .status(200)
                .json({ data: { message: 'destroy successfully' } });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = new CommentController();
