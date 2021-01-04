const mongoose = require("mongoose");
const validator = require("validator");

const contactSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Missing name"],
        trim: true,
        minlength: [3, "name must be at least 3 characters"],
    },
    email: {
        type: String,
        required: [true, "Missing email"],
        validate: [validator.isEmail, "Invalid email"],
        lowercase: true,
        trim: true,
    },
    method: {
        type: String,
        required: [true, "Missing method"],
        enum: {
            values: ["chat", "hire", "collabrate"],
            message: "Method should be one of chat, hire, collabrate",
        },
    },
    message: {
        type: String,
        required: [true, "Missing message"],
        trim: true,
        minlength: [10, "Too few messages"],
    },
});

module.exports = mongoose.model("Contact", contactSchema);
