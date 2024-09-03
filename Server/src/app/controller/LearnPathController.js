const LearnPath = require('../module/LearnPath');
const cloudinary = require('cloudinary').v2;
class LearnPathController {
    // [GET]-- /learn-path/combined
    async AllLearnPath(req, res, next) {
        try {
            const allPath = await LearnPath.find();
            res.status(200).json({ data: allPath });
        } catch (error) {
            res.status(502).json({ message: error.message });
        }
    }
    // [POST] --/learn-path/create
    async CreateLearnPath(req, res, next) {
        try {
            if (req.file) {
                req.body.image = req.file.path;
            }
            const newPath = new LearnPath(req.body);
            await newPath.save();

            res.status(200).json({
                message: 'created learning path successfully',
            });
        } catch (error) {
            if (req.file) cloudinary.uploader.destroy(req.file.filename);
            res.status(502).json({ message: error.message });
        }
    }
    // [PUT] --/learn-path/update/:_id
    async UpdateLearnPath(req, res, next) {
        try {
            const { _id } = req.params;
            const updatePath = await LearnPath.updateOne({ _id }, req.body);

            res.status(200).json({ data: updatePath });
        } catch (error) {
            res.status(403).json({ message: error.message });
        }
    }
    // [PATCH] --/learn-path/restore/:_id
    async RestoreLearnPath(req, res, next) {
        try {
            const { _id } = req.params;
            await LearnPath.restore({ _id });

            res.status(200).json({ data: { message: 'restore successful' } });
        } catch (error) {
            res.status(502).json({ message: 'restore failed' });
        }
    }
    // [DELETE] --/learn-path/delete/:_id
    async DeleteLearnPath(req, res, next) {
        try {
            const { _id } = req.params;
            await LearnPath.delete({ _id });

            res.status(200).json({ data: { message: 'deleted successfully' } });
        } catch (error) {
            res.status(502).json({ message: 'delete failed' });
        }
    }
    // [DELETE] --/learn-path/destroy/:_id
    async DestroyLearnPath(req, res, next) {
        try {
            const { _id } = req.params;
            await LearnPath.deleteOne({ _id });

            res.status(200).json({ data: { message: 'destroy successfully' } });
        } catch (error) {
            console.log(error);
            res.status(502).json({ message: 'destroy failed' });
        }
    }
}

module.exports = new LearnPathController();
