const bcrypt = require('bcryptjs');
const hashPass = (password) => {
    try {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);

        return hash;
    } catch (e) {
        console.log(e);
    }
};
const decryptPass = (password, passDB) => {
    try {
        const decryptPassword = bcrypt.compare({ password, passDB });
        return decryptPassword;
    } catch (error) {
        console.log(error);
    }
};

module.exports = { hashPass, decryptPass };
