const express = require("express");
const router = express.Router();
const authHandeler = require("../../controllers/authController")

router.post("/", authHandeler.authHandeler);

module.exports = router;
