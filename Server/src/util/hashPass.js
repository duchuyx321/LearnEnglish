const bcrypt = require('bcryptjs');
const hashPass = async (password) => {
    try {
        const salt = bcrypt.genSaltSync(10);
        const hash = await bcrypt.hashSync(password, salt);

        return hash;
    } catch (e) {
        console.log(e);
    }
};
const decryptPass = async (password, passDB) => {
    try {
        const decryptPassword = await bcrypt.compare(password, passDB);
        return decryptPassword;
    } catch (error) {
        console.log(error);
    }
};

module.exports = { hashPass, decryptPass };
