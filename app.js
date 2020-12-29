// third-party modules
const express = require("express");

// own modules
const blogRouter = require("./routers/blogRouter");
const app = express();

app.use("/api/blogs", blogRouter);
module.exports = app;
