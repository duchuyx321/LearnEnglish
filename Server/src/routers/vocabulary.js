const express = require('express');

const router = express.Router();

const VocabularyController = require('../app/controller/VocabularyController');
const CreateAudioFile = require('../app/middleware/CreateAudioFile');
const updateAudioCloud = require('../app/middleware/updateAudioCloud');
// [GET]
router.get('/combined', VocabularyController.combinedByLessonID);
router.get('/all-word', VocabularyController.AllVocabulary);
// [POST]
router.post('/create/:lessonID', VocabularyController.createVocabulary);
router.post(
    '/multiple-create/:lessonID',
    VocabularyController.multipleCreateVocabulary,
);
// [PUT]
router.put('/update/:_id', VocabularyController.updateVocabulary);
router.put(
    '/multiple-update-id',
    CreateAudioFile,
    updateAudioCloud,
    VocabularyController.multipleUpdateVocabularyID,
);
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
