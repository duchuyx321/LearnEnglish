const express = require('express');
const router = express.Router();

const { checkToken } = require('../app/middleware/checkToken');
const AdminController = require('../app/controller/AdminController');

// [GET]
router.get('/admin/users', checkToken, AdminController.getAllUsers);
// [POST]

// [PUT]

// [PATCH]

// [DELETE]

module.exports = router;
