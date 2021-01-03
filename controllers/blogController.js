const Blog = require("../models/blogModel");
const catchError = require("../utils/catchError");
exports.getAllBlogs = catchError(async (req, res, next) => {
    const blogs = await Blog.find();

    res.status(200).json({
        status: "success",
        results: blogs.length,
        data: {
            data: blogs,
        },
    });
});

exports.createNewBlog = catchError(async (req, res, next) => {
    const blog = await Blog.create(req.body);
    console.log(blog);
    res.status(201).json({
        status: "success",
        data: {
            data: blog,
        },
    });
});
