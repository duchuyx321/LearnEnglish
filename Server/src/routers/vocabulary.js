const express = require('express');

const router = express.Router();

const VocabularyController = require('../app/controller/VocabularyController');

// [GET]
router.get('/combined/:_id', VocabularyController.combinedByCourseID);
// [POST]
router.post('/create', VocabularyController.createLesson);
// [PUT]
router.post('/update/:_id', VocabularyController.updateLesson);
// [PATCH]
router.patch('/restore/:_id', VocabularyController.restoreLesson);
// [DELETE]
router.delete('/delete/:_id', VocabularyController.deleteLesson);
router.delete('/destroy/:_id', VocabularyController.destroyLesson);

module.exports = router;
