const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');

const Schema = mongoose.Schema;

const Blogs = new Schema(
    {
        author: { type: Schema.Types.ObjectId, required: true },
        content: { type: String, required: true },
        image: { type: String },
        is_approved: { type: Boolean, required: true, default: false },
        is_public: { type: Boolean, required: true, default: true },
        likes: [{ type: Schema.Types.ObjectId }],
        bookmarks: [{ type: Schema.Types.ObjectId }],
    },
    { timestamps: true, collection: 'Blogs' },
);
// index
Blogs.index({ likes: 1 });
Blogs.index({ bookmarks: 1 });
Blogs.index({ is_approved: 1 });

// plugins
mongoose.plugin(mongooseDelete, { deleted: true, overrideMethods: true });

module.exports = mongoose.model('Blogs', Blogs);
