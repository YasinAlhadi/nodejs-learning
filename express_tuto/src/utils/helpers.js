const bcrypt = require("bcryptjs")

function hashPassword(password){
    const salt = bcrypt.genSaltSync();
    return bcrypt.hashSync(password, salt);
}

function comparePass(row, hash) {
    return bcrypt.compareSync(row, hash);
}

module.exports = {hashPassword, comparePass};