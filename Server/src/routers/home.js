const express = require('express');
const router = express.Router();

const HomeController = require('../app/controller/HomeController')

router.get("/",HomeController.Home)

module.exports = router;