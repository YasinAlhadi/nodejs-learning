const userDB = {
  users: require("../data/users.json"),
  setUser: function (data) {
    this.users = data;
  },
};

const fs = require("fs").promises;
const path = require("path");
const bcrypt = require("bcrypt");

const handleNewUse = async (req, res) => {
  const { user, password } = req.body;
  if (!user || !password)
    return res
      .status(400)
      .json({ message: "username and password are required" });
  const doublcated = userDB.users.find((preson) => preson.user === user);
  if (doublcated)
    return res.status(409).json({ message: "already registered" });
  try {
    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = { "user": user, "password": hashPassword };
    userDB.setUser([...userDB.users, newUser]);
    await fs.writeFile(
      path.join(__dirname, "..", "data", "users.json"),
      JSON.stringify(userDB.users)
    );
    console.log(userDB.users);
    res.status(201).json({ message: `${user} added to data` });
  } catch (error) {
    res.status(500), json({ message: error });
  }
};

module.exports = { handleNewUse };
