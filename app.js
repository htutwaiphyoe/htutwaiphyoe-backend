// third-party modules
const express = require("express");

// own modules
const blogRouter = require("./routers/blogRouter");
const app = express();

app.use("/api/blogs", blogRouter);

// handling unhandled routes
app.all("*", (req, res) => {
    res.status(404).json({
        status: "fail",
        message: "Page not found ⚠",
    });
});
module.exports = app;
