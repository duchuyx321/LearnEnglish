const express = require('express');

const router = express.Router();

const VocabularyController = require('../app/controller/VocabularyController');

// [GET]
router.get('/combined/:_id', VocabularyController.combinedByLessonID);
// [POST]
router.post('/create', VocabularyController.createVocabulary);
// [PUT]
router.post('/update/:_id', VocabularyController.updateVocabulary);
// [PATCH]
router.patch('/restore/:_id', VocabularyController.restoreVocabulary);
// [DELETE]
router.delete('/delete/:_id', VocabularyController.deleteVocabulary);
router.delete('/destroy/:_id', VocabularyController.destroyVocabulary);

module.exports = router;
