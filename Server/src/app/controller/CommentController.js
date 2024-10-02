const Comments = require('../module/Comments');
const Profile = require('../module/Profile');
const Users = require('../module/Users');

const { decodeToken } = require('../middleware/checkToken');
class CommentController {
    // [GET] --/comments/combined?page=1&limit=1&commentable_id = &commentable_type
    async getComments(req, res, next) {
        try {
            const { page, limit, commentable_id, commentable_type } = req.query;
            const token = req.headers.authorization;
            let reactable_id = 'none';
            if (token) {
                reactable_id = await decodeToken(token);
            }
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
                let reaction = 'none';
                if (reactable_id !== 'none') {
                    for (const i of item.reactions) {
                        if (i.reactable_id == reactable_id) {
                            reaction = i.reactable_type;
                            console.log(reaction);
                            break;
                        }
                    }
                }
                const { reactions, ...other } = item._doc;
                return {
                    ...other,
                    reaction,
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
    // [PATCH] --/comments/reaction/:_id
    async reactionComment(req, res, next) {
        try {
            const userID = req.userID;
            const { type } = req.body;
            const { _id } = req.params;
            if (!type) {
                return res.status(402).json({ message: 'data not found' });
            }
            let update = '';
            if (type === 'none') {
                // Nếu type là 'none', xóa phần tử có reactable_id là userID
                update = {
                    $pull: {
                        reactions: {
                            reactable_id: userID,
                        },
                    },
                };
            } else {
                // Kiểm tra xem phần tử đã tồn tại trong mảng reactions chưa
                const existingReaction = await Comments.findOne({
                    _id,
                    'reactions.reactable_id': userID,
                });

                if (existingReaction) {
                    // Nếu tồn tại, sửa lại reactable_type của phần tử đó
                    update = {
                        $set: {
                            'reactions.$[elem].reactable_type': type, // Cập nhật reactable_type
                        },
                    };
                } else {
                    // Nếu không tồn tại, thêm mới phần tử vào mảng reactions
                    update = {
                        $addToSet: {
                            reactions: {
                                reactable_id: userID,
                                reactable_type: type,
                            },
                        },
                    };
                }
            }

            const reactions = await Comments.updateOne(
                { _id },
                update,
                { arrayFilters: [{ 'elem.reactable_id': userID }] }, // Chỉ áp dụng cho phần tử có reactable_id = userID
            );
            return res.status(200).json({
                data: {
                    reactions,
                    message: 'reactions successfully',
                },
            });
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
