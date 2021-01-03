// third-party modules
const express = require("express");
// own modules
const blogController = require("../controllers/blogController");

const router = express.Router();

router.route("/").get(blogController.getAllBlogs).post(blogController.createNewBlog);

module.exports = router;
