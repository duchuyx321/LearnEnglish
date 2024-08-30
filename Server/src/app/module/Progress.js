const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');

const Schema = mongoose.Schema;

const Progress = new Schema(
    {
        userID: { type: Schema.ObjectId, required: true },
        lessonID: { type: Schema.ObjectId, default: null }, // bài học hiện tại đang học đến
        progressable_type: {
            type: String,
            required: true,
            enum: ['course', 'blog'],
        },
        progressable_id: { type: Schema.Types.ObjectId, required: true },
        status: {
            type: String,
            required: true,
            enum: ['In_Progress', 'Completed'],
            default: 'In_Progress',
        },
        completionAt: { type: Date },
        completionNumber: {
            type: Number,
            required: true,
            min: 0,
            max: 100,
            default: 0,
        },
    },
    { timestamps: true, collection: 'Progress' },
);
// index
Progress.index({ progressable_id: 1, progressable_type: 1 });

// plugins
mongoose.plugin(mongooseDelete, { deletedAt: true, overrideMethods: true });

module.exports = mongoose.model('Progress', Progress);
