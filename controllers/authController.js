const jwt = require("jsonwebtoken");

const catchError = require("../utils/catchError");
const User = require("../models/userModel");

const generateJWT = (payload) => {
    jwt.sign(payload, process.env.JWT_SECRET_KEY, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });
};

exports.signup = catchError(async (req, res, next) => {
    // get body data
    const { name, email, password, confirmPassword } = req.body;

    // store in database
    const user = await User.create({
        name,
        email,
        password,
        confirmPassword,
    });

    // generate token
    const token = generateJWT({ id: user.id, email: user.email });

    // delete password for response
    user.password = undefined;

    // send response
    res.status(201).json({
        status: "success",
        token,
        data: {
            data: user,
        },
    });
});
