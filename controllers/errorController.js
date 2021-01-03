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

module.exports = (err, req, res, next) => {
    if (process.env.NODE_ENV === "development") {
        sendDevError(err, res);
    } else if (process.env.NODE_ENV === "production") {
        sendProdError(err, res);
    }
};
