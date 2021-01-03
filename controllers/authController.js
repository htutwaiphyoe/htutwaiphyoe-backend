const catchError = require("../utils/catchError");
const User = require("../models/userModel");

exports.signup = catchError(async (req, res, next) => {
    const { name, email, password, confirmPassword } = req.body;
    const user = await User.create({
        name,
        email,
        password,
        confirmPassword,
    });
    res.status(201).json({
        status: "success",
        data: {
            data: user,
        },
    });
});
