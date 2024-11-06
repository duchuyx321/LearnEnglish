const express = require('express');
const router = express.Router();

const { checkToken } = require('../app/middleware/checkToken');
const AdminController = require('../app/controller/AdminController');

// [GET]
router.get('/users', checkToken, AdminController.getAllUsers);
// [POST]

// [PUT]

// [PATCH]
router.patch('/edit', checkToken, AdminController.editUser);
// [DELETE]

module.exports = router;
