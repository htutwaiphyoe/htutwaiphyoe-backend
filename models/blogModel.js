// third-party modules
const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            trim: true,
            required: [true, "Missing blog title"],
        },
        topic: {
            type: String,
            trim: true,
            lowercase: true,
            required: [true, "Missing blog topic"],
        },
        duration: {
            type: Number,
            default: 3,
        },
        createdAt: {
            type: Date,
            required: [true, "Missing blog date"],
        },
        imageCover: {
            type: String,
            required: [true, "Missing blog cover"],
            trim: true,
        },
        body: {
            type: String,
            trim: true,
            required: [true, "Missing blog body"],
        },
    },
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    }
);

const Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog;
