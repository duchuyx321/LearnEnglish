const Users = require('../module/Users');
const Courses = require('../module/Courses');
const Progress = require('../module/Progress');

class ProgressController {
    // [GET] -/progress/combined
    async combinedByUserID(req, res, next) {
        try {
            const { userID } = req.body;
            const progress = await Progress.find({ userID });
            const registeredCourse = await Promise.all(
                progress.map(async (item) => {
                    const courses = await Courses.findOne({
                        _id: item.courseID,
                    });
                    return {
                        progress: item,
                        courses,
                    };
                }),
            );
            res.status(200).json({ data: [registeredCourse] });
        } catch (err) {
            res.status(404).json({ err });
        }
    }
    // [POST] -/progress/create/:courseID
    async createProgress(req, res, next) {
        try {
            const { courseID } = req.params;
            const { userID } = req.body;
            const progress = new Progress({ courseID, userID });
            await progress.save();

            res.status(200).json({ message: 'created Progress successfully' });
        } catch (err) {
            res.status(500).json({ err });
        }
    }
    // [PUT] -/progress/update/:_id
    async updateProgress(req, res, next) {
        try {
            const { _id } = req.params;
            await Progress.updateOne({ _id }, res.body);

            res.status(200).json({ message: 'Updated progress successfully' });
        } catch (err) {
            res.status(500).json({ err });
        }
    }
    // [PATCH] -/progress/restore/:_id
    async restoreProgress(req, res, next) {
        try {
            const { _id } = req.params;
            await Progress.restore({ _id });
            res.status(200).json({ message: 'restored progress successfully' });
        } catch (err) {
            res.status(500).json({ err });
        }
    }
    // [DELETE] -/progress/delete/:id
    async deleteProgress(req, res, next) {
        try {
            const { _id } = req.params;
            await Progress.delete({ _id });

            res.status(200).json({ massage: 'deleted progress successfully' });
        } catch (err) {
            res.status(500).json({ err });
        }
    }
    // [DELETE] -/progress/destroy/:id
    async destroyProgress(req, res, next) {
        try {
            const { _id } = req.params;
            await Progress.deleteOne({ _id });

            res.status(200).json({ message: 'destroy progress successfully' });
        } catch (err) {
            res.status(500).json({ err });
        }
    }
}

module.exports = new ProgressController();
