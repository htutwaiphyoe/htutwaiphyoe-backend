const Blog = require("../models/blogModel");
const catchError = require("../utils/catchError");
const AppError = require("../utils/AppError");

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
    const blog = await Blog.findOne({ slug: req.params.slug });

    if (!blog) {
        return next(new AppError("No blog found ⚠", 404));
    }
    res.status(200).json({
        status: "success",
        data: {
            data: blog,
        },
    });
});
