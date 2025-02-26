const express = require('express');

const router = express.Router();

const ProgressController = require('../app/controller/ProgressController');
const decodeAccessToken = require('../service/decodeToken');

// [GET]
router.get('/combined', decodeAccessToken, ProgressController.combinedByUserID);
router.get(
    '/check-course-registration',
    decodeAccessToken,
    ProgressController.checkCourseRegistration,
);
router.get('/findOne', decodeAccessToken, ProgressController.findOne);
// [POST]
router.post('/create', decodeAccessToken, ProgressController.createProgress);
// [PUT]
router.put('/update', ProgressController.updateProgress);
// [PATCH]

// [DELETE]
module.exports = router;
