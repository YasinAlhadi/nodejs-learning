const userDB = {
    users: require("../data/users.json"),
    setUser: function (data) {
      this.users = data;
    },
  };

const jwt =require("jsonwebtoken");
require("dotenv").config();
const fs = require("fs").promises;
const path = require("path");

const handleLogout = async (req, res) => {
const cookies = req.cookies;
if (!cookies?.jwt) return res.sendStatus(204); // No content
const refreshToken = cookies.jwt;
const foundUser = userDB.users.find(preson => preson.refreshToken === refreshToken);
if (!foundUser) {
    res.clearCookie('jwt', {httpOnly: true, maxAge: 24 * 60 * 60 * 1000});
    res.sendStatus(204);
}
const otherUsers = userDB.users.filter(person => person.refreshToken !== foundUser.refreshToken);
const currentUser = { ...foundUser, refreshToken: '' };
userDB.setUser([...otherUsers, currentUser]);
await fs.writeFile(
  path.join(__dirname, "..", "data", "users.json"),
  JSON.stringify(userDB.users)
  );
  res.clearCookie('jwt', {httpOnly: true, maxAge: 24 * 60 * 60 * 1000}); // secure: true
  res.sendStatus(204);
}

module.exports = { handleLogout };