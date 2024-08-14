const express = require('express');

const router = express.Router();

const CourseController = require('../app/controller/CourseController');
// [GET]
router.get('/combined', CourseController.combinedCourse);

// [POST]
router.post('/create', CourseController.createCourse);

// [PUT]
router.put('/update/:_id', CourseController.updateCourse);

// [PATCH]
router.patch('/restore/:_id', CourseController.restoreCourse);

// [DELETE]
router.delete('/delete/:_id', CourseController.deleteCourse);
router.delete('/destroy/:_id', CourseController.destroyCourse);

module.exports = router;
