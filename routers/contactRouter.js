const express = require("express");

const authController = require("../controllers/authController");
const contactController = require("../controllers/contactController");

const router = express.Router();

router.route("/").post(authController.protect, contactController.createNewContact);

module.exports = router;
