const moment = require('moment');

const formatDay = (day) => {
    const date = moment(day, 'DD/MM/YYYY').toDate();
    return date;
};

module.exports = formatDay;
