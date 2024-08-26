const express = require('express');

const router = express.Router();

const VocabularyController = require('../app/controller/VocabularyController');

// [GET]
router.get('/combined/:lessonID', VocabularyController.combinedByLessonID);
// [POST]
router.post('/create/:lessonID', VocabularyController.createVocabulary);
router.post(
    '/multiple-create/:lessonID',
    VocabularyController.multipleCreateVocabulary,
);
// [PUT]
router.post('/update/:_id', VocabularyController.updateVocabulary);
// [PATCH]
router.patch('/restore/:_id', VocabularyController.restoreVocabulary);
// [DELETE]
router.delete('/delete/:_id', VocabularyController.deleteVocabulary);
router.delete('/destroy/:_id', VocabularyController.destroyVocabulary);
router.delete(
    '/multiple-destroy/:lessonID',
    VocabularyController.multipleDestroyVocabulary,
);

module.exports = router;
