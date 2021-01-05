const express = require("express");

const authController = require("../controllers/authController");
const messageController = require("../controllers/messageController");

const router = express.Router();

router.route("/").post(authController.protect, messageController.createNewMessage);

module.exports = router;
