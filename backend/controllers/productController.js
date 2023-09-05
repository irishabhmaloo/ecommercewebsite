const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const Product = require('../models/productModel');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('./middleware/catchAsyncErrors');

// CREATE product -- ADMIN
exports.createProduct = catchAsyncErrors(async (req, res) => {
    const product = await Product.create(req.body);
    
    res.status(201).json({
        status: "success",
        data: {
            product
        }
    });
});

// GET all products
exports.getAllProducts = catchAsyncErrors(async (req, res) => {
    const products = await Product.find();

    res.status(200).json({
        status: "success",
        data: {
            products
        }
    });
});

// GET product details
exports.getProductDetails = catchAsyncErrors(async (req, res) => {
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
exports.updateProduct = catchAsyncErrors(async (req, res) => {
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
exports.deleteProduct = catchAsyncErrors(async (req, res) => {
    const product = await Product.findById(req.params.id);
    
    if (!product) {
        return next(new ErrorHandler("Product not found", 404));
    }

    await Product.remove();
    
    res.status(200).json({
        status: "success",
        data: null
    });
});