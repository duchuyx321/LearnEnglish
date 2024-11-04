const User = require('../module/Users');

class AdminController {
    // [GET] --/admin/users?sort= "asc"||"desc"
    async getAllUsers(req, res, next) {
        try {
            const role = req.role;
            const { sort } = req.query;
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
            console.log(users);
            return res.status(200).json({ data: users });
        } catch (error) {
            res.status(502).json({ message: error.message });
        }
    }
}

module.exports = new AdminController();
