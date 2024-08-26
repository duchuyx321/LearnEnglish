const Lessons = require('../module/Lessons');
const Courses = require('../module/Courses');

class LessonController {
    // [GET]  -/lesson/combined/:courses_slug
    async combinedByCourseID(req, res, next) {
        try {
            const { course_slug } = req.params;
            const courseData = await Courses.findOne({ slug: course_slug });
            if (!courseData) {
                return res.status(403).json({ message: 'Course not found' });
            }
            const lessons = await Lessons.find({ course_slug });
            const courses = { ...courseData.toJSON(), lessons };
            return res.status(200).json({ data: courses });
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    }
    // [POST] -/lesson/create
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
    // [POST] -/lesson/multiple-create/:course_slug
    async multipleCreateLesson(req, res, next) {
        try {
            const lessonsData = req.body;
            const { course_slug } = req.params;

            if (!Array.isArray(lessonsData) || lessonsData.length === 0) {
                return res.status(400).json({ message: 'Invalid input data' });
            }
            const lessonPromises = lessonsData.map((item) => {
                console.log(item);
                const lesson = Lessons({ course_slug, ...item });
                return lesson.save();
            });
            await Promise.all(lessonPromises); // chờ lưu tất cả vào
            res.status(200).json({ message: 'created Lesson Successfully' });
        } catch (err) {
            res.status(500).json(err);
        }
    }
    // [PUT] -/ lesson/update/:_id
    async updateLesson(req, res, next) {
        try {
            const { courseID } = req.params;
            const lessonUpdate = await Lessons.updateOne(
                { courseID },
                req.body,
            );
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
    // [PUT] -/ lesson/multiple-update/:course_slug
    async multipleUpdateLesson(req, res, next) {
        try {
            const { courseID } = req.params;
            console.log(courseID);
            const lessonUpdate = await Lessons.updateMany(
                { courseID },
                req.body,
            );
            console.log(lessonUpdate);
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
