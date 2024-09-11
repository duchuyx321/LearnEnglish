const express = require('express');

const router = express.Router();
const ApiController = require('../app/controller/ApiController');

// [POST]
router.post('/code/sendCode', ApiController.sendCode);
router.post('/code/checkCode', ApiController.checkCode);

module.exports = router;
