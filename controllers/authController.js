const util = require("util");

const jwt = require("jsonwebtoken");

const catchError = require("../utils/catchError");
const User = require("../models/userModel");
const AppError = require("../utils/AppError");

const generateJWT = (payload) => jwt.sign(payload, process.env.JWT_SECRET_KEY);

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

exports.protect = catchError(async (req, res, next) => {
    let token;

    // get token
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        token = req.headers.authorization.split(" ")[1];
    }

    // check whether token exists
    if (!token) {
        return next(new AppError("You are not logged in!", 401));
    }

    // verify token
    const decoded = await util.promisify(jwt.verify)(token, process.env.JWT_SECRET_KEY);

    // check user
    const user = await User.findById(decoded.id);

    if (!user) {
        return next(new AppError("No user found", 401));
    }
    req.user = user;

    next();
});
