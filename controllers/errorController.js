const AppError = require("../utils/AppError");

const sendDevError = (err, res) => {
    res.status(err.statusCode).json({
        status: err.status,
        name: err.name,
        message: err.message,
        error: err,
        stack: err.stack,
    });
};

const sendProdError = (err, res) => {
    if (err.isOperational) {
        res.status(err.statusCode).json({
            status: "fail",
            message: err.message,
        });
    } else {
        res.status(500).json({
            status: "error",
            message: "Oops! Something went very wrong.",
        });
    }
};

const handleValidationError = (err) => {
    const message = Object.values(err.errors)
        .map((val) => val.message)
        .join(". ");
    return new AppError(message, 400);
};

module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || "error";
    if (process.env.NODE_ENV === "development") {
        sendDevError(err, res);
    } else if (process.env.NODE_ENV === "production") {
        if (err.name === "ValidationError") err = handleValidationError(err);
        sendProdError(err, res);
    }
};
