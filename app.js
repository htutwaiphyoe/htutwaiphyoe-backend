// third-party modules
const express = require("express");

// own modules
const blogRouter = require("./routers/blogRouter");
const authRouter = require("./routers/authRouter");
const errorController = require("./controllers/errorController");
const AppError = require("./utils/AppError");

const app = express();

// Middlewares
// body parser
app.use(express.json());

// api routes
// blogs
app.use("/api/blogs", blogRouter);
// authentication
app.use("/api/auth", authRouter);

// handling unhandled routes
app.all("*", (req, res, next) => {
    next(new AppError("Route not found ⚠", 404));
});

// global error handlers
app.use(errorController);

module.exports = app;
