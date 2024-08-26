const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');

const Schema = mongoose.Schema;

const Vocabulary = new Schema(
    {
        lessonID: { type: Schema.ObjectId, required: true },
        word: { type: String, required: true }, // từ mới
        definition: { type: String, required: true }, // nghĩa từ
        example: { type: String, required: true }, // câu ví dụ
        meaningExamples: { type: String, required: true }, // nghĩa câu ví dụ

        audioWord: { type: String, required: true },
        audioDefinition: { type: String, required: true },
        audioExample: { type: String, required: true },
    },
    { timestamps: true, collection: 'Vocabulary' },
);

// plugins
mongoose.plugin(mongooseDelete, { deletedAt: true, overrideMethods: true });

module.exports = mongoose.model('Vocabulary', Vocabulary);
