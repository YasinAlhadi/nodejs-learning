const userDB = {
    users: require("../data/users.json"),
    setUser: function (data) {
      this.users = data;
    },
  };

const bcrypt = require("bcrypt");
const jwt =require("jsonwebtoken");
require("dotenv").config();
const fs = require("fs").promises;
const path = require("path");

const authHandeler = async (req, res) => {
const { user, password } = req.body;
if (!user || !password) return res.status(400).json({ message: "username and password are required" });
const findUser = userDB.users.find(preson => preson.user === user);
if (!findUser) return res.sendStatus(401);
const match = bcrypt.compare(password, findUser.password)
if (match) {
    const accessToken = jwt.sign(
        { "user": findUser.user },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "40s" }
    );
    const refreshToken = jwt.sign(
        { "user": findUser.user },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: "1d" }
    );
    const otherUsers = userDB.users.filter(person => person.user !== findUser.user);
    const currentUser = { ...findUser, refreshToken };
    userDB.setUser([...otherUsers, currentUser]);
    await fs.writeFile(
        path.join(__dirname, "..", "data", "users.json"),
        JSON.stringify(userDB.users)
      );
      res.cookie('jwt', refreshToken, {httpOnly: true, maxAge: 24 * 60 * 60 * 1000});
      res.json({accessToken});
} else {
    res.sendStatus(401);
}   
}

module.exports = { authHandeler };