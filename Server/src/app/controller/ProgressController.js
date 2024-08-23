const Users = require('../module/Users');
const Courses = require('../module/Courses');
const Progress = require('../module/Progress');

class ProgressController {
    // [GET] -/progress/combined?type=course
    async combinedByUserID(req, res, next) {
        try {
            const { type } = req.query;
            const { userID } = req.body;
            const progressData = await Progress.find({
                userID,
                progressable_type: type,
            });

            const data = await Promise.all(
                progressData.map(async (item) => {
                    const courseData = await Courses.findOne({
                        _id: item.progressable_id.toString(),
                    });

                    const course =
                        courseData.length === 1 ? courseData[0] : courseData;
                    return {
                        progress: { ...item.toObject(), course },
                    };
                }),
            );
            res.status(200).json({ data });
        } catch (err) {
            console.log(err);
            res.status(404).json({ err });
        }
    }
    // [POST] -/progress/create/:courseID?type=
    async createProgress(req, res, next) {
        try {
            const { userID } = req.body;
            const { courseID } = req.params;
            const { type } = req.query;
            const progress = new Progress({
                userID,
                progressable_id: courseID,
                progressable_type: type,
            });
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
