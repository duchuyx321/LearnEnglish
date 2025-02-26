const mongoose = require('mongoose');
require('dotenv').config();

const Connect = async () => {
    try {
        mongoose.connect(process.env.URL_MONGODB);
        console.log('Database Connect Successfully');
    } catch (err) {
        console.log(err + 'Database Connect Failed');
    }
};

module.exports = Connect;
