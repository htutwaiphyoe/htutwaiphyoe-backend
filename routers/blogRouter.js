// third-party modules
const express = require("express");
// own modules
const blogController = require("../controllers/blogController");
const authController = require("../controllers/authController");

const router = express.Router();

router.use(authController.protect);

router.route("/").get(blogController.getAllBlogs).post(blogController.createNewBlog);

router.route("/:slug").get(blogController.getSingleBlog);

module.exports = router;
