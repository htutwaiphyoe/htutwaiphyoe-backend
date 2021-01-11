// third-party modules
const express = require("express");
const cors = require("cors");

// own modules
const blogRouter = require("./routers/blogRouter");
const authRouter = require("./routers/authRouter");
const messageRouter = require("./routers/messageRouter");
const errorController = require("./controllers/errorController");
const AppError = require("./utils/AppError");

const app = express();

// Middlewares
// body parser
app.use(express.json());

// CORS
app.use(cors());
// api routes
// blogs
app.use("/api/blogs", blogRouter);

// messages
app.use("/api/messages", messageRouter);

// authentication
if (process.env.NODE_ENV !== "production") {
    app.use("/api/auth", authRouter);
}

// handling unhandled routes
app.all("*", (req, res, next) => {
    next(new AppError("Route not found ⚠", 404));
});

// global error handlers
app.use(errorController);

module.exports = app;
