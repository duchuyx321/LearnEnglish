const express = require('express');

const router = express.Router();

const CourseController = require('../app/controller/CourseController');
// [GET]
router.get('/combined', CourseController.combinedCourse);

// [POST]
router.post('/create', CourseController.createCourse);

module.exports = router;
