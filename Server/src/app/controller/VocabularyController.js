const Lessons = require('../module/Lessons');
const Vocabulary = require('../module/Vocabulary');

class VocabularyController {
    // [GET]  -/vocabulary/combined/:_id
    async combinedByLessonID(req, res, next) {
        try {
            const { courseID } = req.params;
            const course = await Lessons.findOne({ _id: courseID });
            const lessons = await Vocabulary.find({ courseID });
            res.status(200).json({ data: [{ course }, { lessons }] });
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    }
    // [POST] -/vocabulary/create/:_id
    async createVocabulary(req, res, next) {
        try {
            const { lessonID, word, definition, exampleSentence } = req.body;
            const lesson = new Lessons({
                lessonID,
                word,
                definition,
                exampleSentence,
            });
            await lesson.save();
            res.status(200).json({
                message: 'created Vocabulary Successfully',
            });
        } catch (err) {
            res.status(500).json(err);
        }
    }
    // [PUT] -/vocabulary/update/:_id
    async updateVocabulary(req, res, next) {
        try {
            const { _id } = req.params;
            const lessonUpdate = await Vocabulary({ _id }, req.body);
            if (lessonUpdate.modifiedCount === 0) {
                return res
                    .status(404)
                    .json({ massage: 'Vocabulary not Found' });
            }
            return res.status(200).json({
                message: 'Vocabulary updated successfully',
                lessonUpdate,
            });
        } catch (err) {
            res.status(500).json({ err });
        }
    }
    // [PATCH] -/vocabulary/restore/:_id
    async restoreVocabulary(req, res, next) {
        try {
            const { _id } = req.params;
            await Vocabulary.restore({ _id });
            return res
                .status(200)
                .json({ message: 'Restored Vocabulary successfully' });
        } catch (err) {
            res.status(500).json({ err });
        }
    }
    // [DELETE] -/vocabulary/delete/:_id
    async deleteVocabulary(req, res, next) {
        try {
            const { _id } = req.params;
            await Vocabulary.delete({ _id });
            res.status(200).json({
                message: 'Deleted Vocabulary successfully',
            });
        } catch (err) {
            res.status(500).json({ err });
        }
    }
    // [DELETE] -/vocabulary/destroy/:_id
    async destroyVocabulary(req, res, next) {
        try {
            const { _id } = req.params;
            await Vocabulary.deleteOne({ _id });
            res.status(200).json({
                message: 'destroy Vocabulary successfully',
            });
        } catch (err) {
            res.status(500).json({ err });
        }
    }
}

module.exports = new VocabularyController();
