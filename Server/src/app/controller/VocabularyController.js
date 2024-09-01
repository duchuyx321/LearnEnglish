const Lessons = require('../module/Lessons');
const Vocabulary = require('../module/Vocabulary');

class VocabularyController {
    // [GET]  -/vocabulary/combined?lessonID=
    async combinedByLessonID(req, res, next) {
        try {
            const { lessonID } = req.query;
            const lessons = await Lessons.findOne({ _id: lessonID });
            if (!lessons) {
                return res.status(403).json({ message: 'lessons not found' });
            }
            const vocabulary = await Vocabulary.find({ lessonID });
            res.status(200).json({ data: vocabulary });
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    }
    // [GET] -/vocabulary/all-word?page & limit
    async AllVocabulary(req, res, next) {
        try {
            // Lấy tham số truy vấn từ yêu cầu
            const page = parseInt(req.query.page) || 1; // Trang hiện tại, mặc định là 1
            const limit = parseInt(req.query.limit) || 20; // Số lượng tài liệu mỗi trang, mặc định là 20

            // Tính số lượng tài liệu cần bỏ qua
            const skip = (page - 1) * limit;
            const allVocabulary = await Vocabulary.find({}, 'word')
                .skip(skip)
                .limit(limit);

            res.status(200).json({ data: allVocabulary });
        } catch (err) {
            console.log(err);
            res.status(502).json({ message: err.message });
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
    // [PUT] -/vocabulary/multiple-update-id
    async multipleUpdateVocabularyID(req, res, next) {
        try {
            const files = req.files;
            const { fileNames } = req.body;
            console.log(files);
            // const VocabularyUpdate = await Vocabulary.updateMany(
            //     { _id },
            //     { $set: { audioUrl: files } }
            // );
            fileNames.map((item) => {
                if (fs.existsSync(item)) {
                    fs.unlinkSync(item);
                }
            });
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
            if (req.file) cloudinary.v2.uploader.destroy(req.file.filename);
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
