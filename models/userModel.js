const mongoose = require("mongoose");
const validator = require("validator");
const uniqueValidator = require("mongoose-unique-validator");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        minlength: [4, "Name must be at least 4 characters"],
        required: [true, "Missing name"],
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: [true, "Missing email"],
        validate: [validator.isEmail, "Invalid email"],
    },
    password: {
        type: String,
        minlength: [8, "Password must be at least 8 characters"],
        trim: true,
        required: [true, "Missing password"],
        select: false,
    },
    confirmPassword: {
        type: String,
        required: [true, "Missing confirmPassword"],
        validate: {
            validator: function (val) {
                return val === this.password;
            },
            message: "Passwords do not match",
        },
    },
});

// plugins
userSchema.plugin(uniqueValidator, { message: "Email is already in use" });

// document middlewares
userSchema.pre("save", async function (next) {
    // skip encryption step if password is not changed
    if (!this.isModified("password")) return next();

    // hash password
    this.password = await bcrypt.hash(this.password, 12);

    // delete confirmPassword
    this.confirmPassword = undefined;

    next();
});

// instance methods
userSchema.methods.checkPassword = async function (inputPassword, hashPassword) {
    return await bcrypt.compare(inputPassword, hashPassword);
};

module.exports = mongoose.model("User", userSchema);
