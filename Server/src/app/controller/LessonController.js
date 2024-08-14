const Lessons = require('../module/Lessons');
const Courses = require('../module/Courses');

class LessonController {
    // [GET]  -/lesson/combined/:_id
    async combinedByCourseID(req, res, next) {
        try {
            const { courseID } = req.params;
            const course = await Courses.findOne({ _id: courseID });
            const lessons = await Lessons.find({ courseID });
            res.status(200).json({ data: [{ course }, { lessons }] });
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    }
    // [POST] -/lesson/create/:_id
    async createLesson(req, res, next) {
        try {
            const { lessonName, lessonContent, lessonTarget, courseID } =
                req.body;
            const lesson = new Lessons({
                courseID,
                lessonName,
                lessonContent,
                lessonTarget,
            });
            await lesson.save();
            res.status(200).json({ message: 'created Lesson Successfully' });
        } catch (err) {
            res.status(500).json(err);
        }
    }
    // [PUT] -/ lesson/update/:_id
    async updateLesson(req, res, next) {
        try {
            const { _id } = req.params;
            const lessonUpdate = await Lessons({ _id }, req.body);
            if (lessonUpdate.modifiedCount === 0) {
                return res.status(404).json({ massage: 'Lessons not Found' });
            }
            return res.status(200).json({
                message: 'Lessons updated successfully',
                lessonUpdate,
            });
        } catch (err) {
            res.status(500).json({ err });
        }
    }
    // [PATCH] -/lesson/restore/:_id
    async restoreLesson(req, res, next) {
        try {
            const { _id } = req.params;
            await Lessons.restore({ _id });
            return res
                .status(200)
                .json({ message: 'Restored lesson successfully' });
        } catch (err) {
            res.status(500).json({ err });
        }
    }
    // [DELETE] -/lesson/delete/:_id
    async deleteLesson(req, res, next) {
        try {
            const { _id } = req.params;
            await Lessons.delete({ _id });
            res.status(200).json({ message: 'Deleted lesson successfully' });
        } catch (err) {
            res.status(500).json({ err });
        }
    }
    // [DELETE] -/lesson/destroy/:_id
    async destroyLesson(req, res, next) {
        try {
            const { _id } = req.params;
            await Lessons.deleteOne({ _id });
            res.status(200).json({ message: 'destroy lesson successfully' });
        } catch (err) {
            res.status(500).json({ err });
        }
    }
}

module.exports = new LessonController();
