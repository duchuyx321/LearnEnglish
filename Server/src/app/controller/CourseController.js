const Courses = require('../module/Courses');

class CourseController {
    // [GET] -/course/combined
    async combinedCourse(req, res, next) {
        try {
            const courses = await Courses.find();
            res.status(200).json({ data: courses });
        } catch (e) {
            res.status(403).json({ message: 'Error must be responded to', e });
        }
    }
    // [GET] -/course/findCourse/_:id
    async findCourse(req, res, next) {
        try {
            const { _id } = req.params;
            const course = await Courses.findOne({ _id });
            res.status(200).json({ data: [course] });
        } catch (error) {
            res.status(404).json(error);
        }
    }
    // [GET] -/course/search?q=...
    async searchCourse(req, res, next) {
        try {
            if (req.query.text) {
                const regexText = new RegExp(req.query.q, 'i');
                const results = await Notes.find({
                    $or: [
                        { title: { $regex: regexText } },
                        { content: { $regex: regexText } },
                    ],
                });

                res.status(200).json({ data: [results] });
            }
        } catch (error) {
            res.status(404).json(error);
        }
    }
    // [POST] -/course/create
    async createCourse(req, res, next) {
        try {
            const { courseName, courseDescription } = req.body;
            const newCourse = new Courses({ courseName, courseDescription });
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

    //[PUT] -/course/update/:_id
    async updateCourse(req, res, next) {
        try {
            const _id = req.params._id;
            const courseUpdate = await Courses.updateOne({ _id }, req.body);
            if (courseUpdate.modifiedCount === 0) {
                return res.status(404).json({ massage: 'Course not Found' });
            }
            return res.status(200).json({
                message: 'Course updated successfully',
                courseUpdate,
            });
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    }
    // [PATCH] /course/restore/:_id
    async restoreCourse(req, res, next) {
        try {
            await Courses.restore({ _id: req.params._id });
            res.status(200).json({ message: 'restored successfully' });
        } catch (err) {
            res.status(401).json({ massage: 'ID not found', err });
        }
    }

    // [DELETE] -/course/delete/:_id
    async deleteCourse(req, res, next) {
        try {
            await Courses.delete({ _id: req.params._id });
            res.status(200).json({ message: 'Course deleted successfully' });
        } catch (err) {
            res.status(500).json(err);
        }
    }
    // [DELETE] -/course/destroy/_:id
    async destroyCourse(req, res, next) {
        await Courses.deleteOne({ _id: req.params._id });
        res.status(200).json({ message: 'Course destroy successfully' });
    }
}
module.exports = new CourseController();
