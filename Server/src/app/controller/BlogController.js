const { request } = require('express');
const cloudinary = require('cloudinary').v2;

const Blogs = require('../module/Blog');
const Profile = require('../module/Profile');
const { decodeToken } = require('../middleware/checkToken');

class BlogController {
    // [GET] --/blog/combined?page= &limit=10
    async getBlog(req, res, next) {
        try {
            const { page, limit } = req.query;
            const skip = (page - 1) * limit;
            const totalBlogs = await Blogs.countDocuments();
            const totalPages = Math.ceil(totalBlogs / limit);
            const blog = await Blogs.find().skip(skip).limit(limit);

            const token = req.headers.authorization;
            const userID = token ? await decodeToken(token) : null;

            const formattedBlogPromises = blog.map(async (item) => {
                const is_like = userID ? item.likes.includes(userID) : false;
                const is_bookmark = userID
                    ? item.bookmarks.includes(userID)
                    : false;
                const profile = await Profile.findOne({
                    userID: item.author.toString(),
                });
                return {
                    _id: item._id,
                    content: item.content,
                    image: item.image,
                    is_public: item.is_public,
                    is_like,
                    is_bookmark,
                    like_count: item.likes.length,
                    profile,
                    createdAt: item.createdAt,
                    updatedAt: item.updatedAt,
                };
            });
            const formattedBlog = await Promise.all(formattedBlogPromises);
            return res
                .status(200)
                .json({ data: formattedBlog, total: totalPages });
        } catch (error) {
            console.log(error);
            res.status(502).json({ message: error.message });
        }
    }
    // [POST] --/blog/create
    async createBlog(req, res, next) {
        try {
            const userID = req.userID;
            const { content } = req.body;
            if (!content) {
                return res.status(402).json({ message: 'data is not enough' });
            }
            if (req.file) {
                req.body.image = req.file.path;
            }
            const newBlog = new Blogs({ author: userID, ...req.body });
            await newBlog.save();
            return res.status(200).json({ message: 'Created successfully' });
        } catch (error) {
            if (req.file) {
                cloudinary.uploader.destroy(req.file.fileName);
            }
            res.status(502).json({ message: error.message });
        }
    }
    // [PUT] --/blog/update/:_id
    async updateBlog(req, res, next) {
        try {
            const { _id } = req.params;
            const userID = req.userID;
            const { is_like, is_bookmark, ...other } = req.body;
            const updateBlog = { ...other };
            console.log(Boolean(is_like));
            if (is_like !== undefined) {
                if (is_like === 'true' || is_like === true || is_like === 1) {
                    updateBlog.$addToSet = { likes: userID };
                } else {
                    updateBlog.$pull = { likes: userID };
                }
            }
            if (is_bookmark !== undefined) {
                if (
                    is_bookmark === 'true' ||
                    is_bookmark === true ||
                    is_bookmark === 1
                ) {
                    updateBlog.$addToSet = {
                        ...updateBlog.$addToSet,
                        bookmarks: userID,
                    };
                } else {
                    updateBlog.$pull = {
                        ...updateBlog.$pull,
                        bookmarks: userID,
                    };
                }
            }
            const newBLog = await Blogs.updateOne({ _id }, updateBlog);
            res.status(200).json({ data: newBLog });
        } catch (error) {
            res.status(502).json({ message: error.message });
        }
    }
}

module.exports = new BlogController();
