const Course = require('../module/Courses');

class CourseController {
    // [GET] -/course/combined
    async combinedCourse(req, res, next) {
        try {
            const courses = await Course.find();
            res.status(200).json({ data: courses });
        } catch (e) {
            res.status(403).json({ message: 'Error must be responded to', e });
        }
    }

    // [POST] -/course/create
    async createCourse(req, res, next) {
        try {
            const { courseName, courseDescription } = req.body;
            const newCourse = new Course({ courseName, courseDescription });
            await newCourse.save();
            res.status(200).json({
                data: [{ massage: 'Create new course successfully' }],
            });
        } catch (e) {
            res.status(400).json({
                message: 'create new course into db failed',
                e,
            });
        }
    }
}
module.exports = new CourseController();
