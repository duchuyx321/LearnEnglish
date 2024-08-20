const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');

const Schema = mongoose.Schema;

const Comments = new Schema(
    {
        userID: { type: Schema.Types.ObjectId, required: true },
        parentID: {
            type: Schema.Types.ObjectId,
            default: null,
        },
        commentContent: { type: String, required: true },
        commentable_type: { type: String, enum: ['blog', 'course', 'lesson'] },
        commentable_id: { type: Schema.Types.ObjectId, required: true },
    },
    { timestamps: true, collection: 'Comments' },
);

// plugins
mongoose.plugin(mongooseDelete, { deletedAt: true, overrideMethods: true });

module.exports = mongoose.model('Comments', Comments);
