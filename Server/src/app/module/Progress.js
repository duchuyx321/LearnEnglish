const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');

const Schema = mongoose.Schema;

const Progress = new Schema(
    {
        userID: { type: Schema.ObjectId, required: true },
        courseID: { type: Schema.ObjectId, required: true }, // khóa học
        lessonID: { type: Schema.ObjectId, required: true }, // bài học hiện tại đang học đến
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
            min: 1,
            max: 100,
            default: 0,
        },
    },
    { timestamps: true },
);

// plugins
mongoose.plugin(mongooseDelete, { delete: true, deleteAt: true });

module.exports = mongoose.model('Progress', Progress);
