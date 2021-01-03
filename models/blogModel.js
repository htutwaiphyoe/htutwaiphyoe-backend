// third-party modules
const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            trim: true,
            required: [true, "Missing blog title"],
        },
        tag: {
            type: String,
            trim: true,
            lowercase: true,
            required: [true, "Missing blog topic"],
        },
        readTime: {
            type: Number,
            default: 3,
        },
        createdAt: {
            type: Date,
            required: [true, "Missing blog date"],
            default: Date.now(),
        },
        imageCover: {
            type: String,
            required: [true, "Missing blog cover"],
            trim: true,
        },
        body: {
            type: Array,
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
