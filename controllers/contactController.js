const catchError = require("../utils/catchError");
const Contact = require("../models/contactModel");

exports.createNewContact = catchError(async (req, res, next) => {
    const contact = await Contact.create(req.body);

    res.status(201).json({
        status: "success",
        message: "Sent your message successfully",
        data: {
            data: contact,
        },
    });
});
