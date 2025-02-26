const Users = require('../module/Users');

class AdminController {
    // [GET] --/admin/users?sort= "asc"||"desc"
    async getAllUsers(req, res, next) {
        try {
            const role = req.role;
            const { sort } = req.query;
            console.log(role, sort);
            if (role !== 'admin') {
                return res
                    .status(403)
                    .json({ message: 'You lack permission.' });
            }
            const sortOptions =
                sort === 'asc'
                    ? { role: -1, username: 1 } // admin trước
                    : { username: 1, role: 1 }; // sắp xếp tên user trước và admin sau
            const users = await Users.findWithDeleted().sort(sortOptions);
            return res.status(200).json({ data: users });
        } catch (error) {
            console.log(error);
            res.status(502).json({ message: error.message });
        }
    }
    // [PATCH]
    async editUser(req, res, next) {
        try {
            const { listUsers } = req.body;
            const { role } = req.role;
            if (role !== 'admin') {
                return res
                    .status(403)
                    .json({ message: 'You lack permission.' });
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

module.exports = new AdminController();
