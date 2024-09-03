const express = require('express');

const router = express.Router();

const LearnPathController = require('../app/controller/LearnPathController');
const { uploadLearnPathCloud } = require('../app/middleware/uploadCloudinary');

// [GET]
router.get('/combined', LearnPathController.AllLearnPath);

// [POST]
router.post(
    '/create',
    uploadLearnPathCloud.single('image'),
    LearnPathController.CreateLearnPath,
);

// [PUT]
router.put('/update/:_id', LearnPathController.UpdateLearnPath);

// [PATCH]
router.patch('/restore/:_id', LearnPathController.RestoreLearnPath);

// [DELETE]
router.delete('/delete/:_id', LearnPathController.DeleteLearnPath);
router.delete('/destroy/:_id', LearnPathController.DestroyLearnPath);

module.exports = router;
