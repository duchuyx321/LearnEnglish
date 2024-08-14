const express = require('express');

const router = express.Router();

const LessonController = require('../app/controller/LessonController');

// [GET]
router.get('/combined/:_id', LessonController.combinedByCourseID);
// [POST]
router.post('/create', LessonController.createLesson);
// [PUT]
router.post('/update/:_id', LessonController.updateLesson);
// [PATCH]
router.patch('/restore/:_id', LessonController.restoreLesson);
// [DELETE]
router.delete('/delete/:_id', LessonController.deleteLesson);
router.delete('/destroy/:_id', LessonController.destroyLesson);

module.exports = router;
