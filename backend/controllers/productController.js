const Product = require('../models/productModel');

// CREATE product -- ADMIN
exports.createProduct = async (req, res) => {
    try {
        const product = await Product.create(req.body);
        res.status(201).json({
            status: "success",
            data: {
                product
            }
        })
    } catch(err) {
        res.status(400).json({
            status: "fail",
            message: "failure occured"
        })
    }
}

// GET all products
exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(201).json({
            status: "success",
            data: {
                products
            }
        })
    } catch(err) {
        res.status(400).json({
            status: "fail",
            message: "failure occured"
        })
    }
};

// GET product details
exports.getProductDetails = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        res.status(201).json({
            status: "success",
            data: {
                product
            }
        })
    } catch(err) {
        res.status(500).json({
            status: "fail",
            message: "Product not found"
        })
    }
};

// UPDATE product -- ADMIN
exports.updateProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            useFindAndModify: false,
            runValidators: true
        });
        res.status(200).json({
            status: "success",
            data: {
                product
            }
        })
    } catch(err) {
        res.status(500).json({
            status: "fail",
            message: "No product found"
        })
    }
};

// DELETE product -- ADMIN
exports.deleteProduct = async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.status(200).json({
            status: "success",
            data: null
        })
    } catch(err) {
        res.status(500).json({
            status: "fail",
            message: "No product found"
        })
    }
};