const express = require("express");
const router = express.Router();
const registerUser = require("../../controllers/userHandlers");

router.post("/", registerUser.handleNewUse);

module.exports = router;
