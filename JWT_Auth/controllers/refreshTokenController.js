const userDB = {
    users: require("../data/users.json"),
    setUser: function (data) {
      this.users = data;
    },
  };

const jwt =require("jsonwebtoken");
require("dotenv").config();

const handleRefreshToken = (req, res) => {
const cookies = req.cookies;
if (!cookies?.jwt) return res.sendStatus(401)
console.log(cookies.jwt);
const refreshToken = cookies.jwt;

const foundUser = userDB.users.find(preson => preson.refreshToken === refreshToken);
if (!foundUser) return res.sendStatus(403);
// verify jwt
jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
    (err, decoded) => {
        if (err || foundUser.user !== decoded.user) return res.sendStatus(403);
        const accessToken = jwt.sign(
            { "user": decoded.user },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "40s" }
        );
        res.json({ accessToken });
    }
);

}

module.exports = { handleRefreshToken };