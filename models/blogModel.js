// third-party modules
const mongoose = require("mongoose");

// const bodySchema = new mongoose.Schema({
//     type: {
//         type: String,
//         required: [true, "Missing type"],
//         trim: true,
//         enum: {
//             values: ["text", "heading", "code", "link", "image"],
//             message: "Type should be one of text, heading ,code, link and image",
//         },
//     },
//     body: {
//         type: String,
//         required: [true, "Missing body"],
//         trim: true,
//     },
// });

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
            required: [true, "Missing blog tag"],
        },
        readTime: {
            type: Number,
            default: 5,
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
            // type: [bodySchema],
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
