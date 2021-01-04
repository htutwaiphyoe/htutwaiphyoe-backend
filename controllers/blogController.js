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
    res.status(201).json({
        status: "success",
        data: {
            data: blog,
        },
    });
});

exports.getSingleBlog = catchError(async (req, res, next) => {
    const blog = await Blog.findById(req.params.id);

    res.status(200).json({
        status: "success",
        data: {
            data: blog,
        },
    });
});
