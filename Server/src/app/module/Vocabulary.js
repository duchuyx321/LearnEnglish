const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');

const Schema = mongoose.Schema;

const Vocabulary = new Schema(
    {
        lessonID: { type: Schema.ObjectId, required: true },
        word: { type: String, required: true }, // từ mới
        definition: { type: String, required: true }, // nghĩa từ
        exampleSentence: { type: String, required: true }, // câu ví dụ
        audioUrl: { type: String, required: true },
    },
    { timestamps: true, collection: 'Vocabulary' },
);

// plugins
mongoose.plugin(mongooseDelete, { deletedAt: true, overrideMethods: true });

module.exports = mongoose.model('Vocabulary', Vocabulary);
