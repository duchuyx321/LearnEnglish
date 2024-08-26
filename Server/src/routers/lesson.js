const express = require('express');

const router = express.Router();

const LessonController = require('../app/controller/LessonController');

// [GET]
router.get('/combined/:course_slug', LessonController.combinedByCourseID);
// [POST]
router.post('/create', LessonController.createLesson);
router.post(
    '/multiple-create/:course_slug',
    LessonController.multipleCreateLesson,
);
// [PUT]
router.put('/update/:_id', LessonController.updateLesson);
router.put(
    '/multiple-update/:course_slug',
    LessonController.multipleUpdateLesson,
);
// [PATCH]
router.patch('/restore/:_id', LessonController.restoreLesson);
// [DELETE]
router.delete('/delete/:_id', LessonController.deleteLesson);
router.delete('/destroy/:_id', LessonController.destroyLesson);

module.exports = router;
