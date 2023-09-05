const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const Product = require('../models/productModel');
const ApiFeatures = require('../utils/apiFeatures');
const ErrorHandler = require('../utils/errorHandler');

// CREATE product -- ADMIN
exports.createProduct = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.create(req.body);
    
    res.status(201).json({
        status: "success",
        data: {
            product
        }
    });
});

// GET all products
exports.getAllProducts = catchAsyncErrors(async (req, res, next) => {
    
    const resultsPerPage = 5;
    const productCount = await Product.countDocuments();

    const apiFeature = new ApiFeatures(Product.find(), req.query)
        .search()
        .filter()
        .pagination(resultsPerPage);
    const products = await apiFeature.query;

    res.status(200).json({
        status: "success",
        data: {
            productCount,
            products
        }
    });
});

// GET product details
exports.getProductDetails = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.findById(req.params.id);
    
    if (!product) {
        return next(new ErrorHandler("Product not found", 404));
    }

    res.status(200).json({
        status: "success",
        data: {
            product
        }
    });
});

// UPDATE product -- ADMIN
exports.updateProduct = catchAsyncErrors(async (req, res, next) => {
    let product = await Product.findById(req.params.id);
    
    if (!product) {
        return next(new ErrorHandler("Product not found", 404));
    }
    
    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        useFindAndModify: false,
        runValidators: true
    });

    res.status(200).json({
        status: "success",
        data: {
            product
        }
    });
});

// DELETE product -- ADMIN
exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.findById(req.params.id);
    
    if (!product) {
        return next(new ErrorHandler("Product not found", 404));
    }

    await Product.deleteOne({_id: req.params.id});
    
    res.status(200).json({
        status: "success",
        data: null
    });
});