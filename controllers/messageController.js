const catchError = require("../utils/catchError");
const Message = require("../models/messageModel");

exports.createNewMessage = catchError(async (req, res, next) => {
    const message = await Message.create(req.body);

    res.status(201).json({
        status: "success",
        message: "Sent your message successfully",
        data: {
            data: message,
        },
    });
});
