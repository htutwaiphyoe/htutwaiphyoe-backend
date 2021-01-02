const jwt = require("jsonwebtoken");

const catchError = require("../utils/catchError");
const User = require("../models/userModel");
const AppError = require("../utils/AppError");

const generateJWT = (payload) =>
    jwt.sign(payload, process.env.JWT_SECRET_KEY, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });

const sendResponseWithToken = (statusCode, user, res) => {
    // generate token
    const token = generateJWT({ id: user.id, email: user.email });

    // delete password for response
    user.password = undefined;

    // send response
    res.status(statusCode).json({
        status: "success",
        token,
        data: {
            data: user,
        },
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

    // send response
    sendResponseWithToken(201, user, res);
});

exports.login = catchError(async (req, res, next) => {
    // get body data
    const { email, password } = req.body;

    // check data
    if (!email || !password) {
        return next(new AppError("Missing email or password", 400));
    }
    // get user
    const user = await User.findOne({ email }).select("+password");

    // check user exists
    if (!user || !(await user.checkPassword(password, user.password))) {
        return next(new AppError("Incorrect email or password", 400));
    }

    // send response
    sendResponseWithToken(200, user, res);
});
