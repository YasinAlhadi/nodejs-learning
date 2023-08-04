const moment = require('moment')

module.exports = {
    dateForamt: function (date, format) {
        return moment(date).format(format)
    },
}