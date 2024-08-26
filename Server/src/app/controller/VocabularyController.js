const Lessons = require('../module/Lessons');
const Vocabulary = require('../module/Vocabulary');

class VocabularyController {
    // [GET]  -/vocabulary/combined/:lessonID
    async combinedByLessonID(req, res, next) {
        try {
            const { lessonID } = req.params;
            const lessons = await Lessons.findOne({ _id: lessonID });
            if (!lessons) {
                return res.status(403).json({ message: 'lessons not found' });
            }
            const vocabulary = await Vocabulary.find({ lessonID });
            const lessonData = { ...lessons.toJSON(), vocabulary };
            res.status(200).json({ data: [lessonData] });
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    }
    // [POST] -/vocabulary/create/:lessonID
    async createVocabulary(req, res, next) {
        try {
            const { lessonID } = req.params;
            const lesson = new Lessons({
                lessonID,
                ...req.body,
            });
            await lesson.save();
            res.status(200).json({
                message: 'created Vocabulary Successfully',
            });
        } catch (err) {
            res.status(500).json(err);
        }
    }
    // [POST] -/vocabulary/multiple-create/:lessonID
    async multipleCreateVocabulary(req, res, next) {
        try {
            const { lessonID } = req.params;
            const vocabularyData = req.body;
            const vocabularyPromise = vocabularyData.map((item) => {
                const vocabulary = new Vocabulary({
                    lessonID,
                    ...item,
                });
                return vocabulary.save();
            });
            await Promise.all(vocabularyPromise); // chờ lưu tất cả vào
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
            const VocabularyUpdate = await Vocabulary.updateOne(
                { _id },
                req.body,
            );
            if (VocabularyUpdate.modifiedCount === 0) {
                return res
                    .status(404)
                    .json({ massage: 'Vocabulary not Found' });
            }
            return res.status(200).json({
                message: 'Vocabulary updated successfully',
                VocabularyUpdate,
            });
        } catch (err) {
            res.status(500).json({ err });
        }
    }
    // [PUT] -/vocabulary/multiple-update/:lessonID
    async multipleUpdateVocabulary(req, res, next) {
        try {
            const { lessonID } = req.params;
            const VocabularyUpdate = await Vocabulary.updateOne(
                { lessonID },
                req.body,
            );
            if (VocabularyUpdate.modifiedCount === 0) {
                return res
                    .status(404)
                    .json({ massage: 'Vocabulary not Found' });
            }
            return res.status(200).json({
                message: 'Vocabulary updated successfully',
                VocabularyUpdate,
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
    // [DELETE] -/vocabulary/multiple-destroy/:lessonID
    async multipleDestroyVocabulary(req, res, next) {
        try {
            const { lessonID } = req.params;
            await Vocabulary.deleteMany({ lessonID });
            res.status(200).json({
                message: 'destroy Vocabulary successfully',
            });
        } catch (err) {
            res.status(500).json({ err });
        }
    }
}

module.exports = new VocabularyController();
