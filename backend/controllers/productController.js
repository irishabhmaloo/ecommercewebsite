const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const Product = require('../models/productModel');
const ApiFeatures = require('../utils/apiFeatures');
const ErrorHandler = require('../utils/errorHandler');

// CREATE product -- ADMIN
exports.createProduct = catchAsyncErrors(async (req, res, next) => {
    
    req.body.user = req.user.id;
    
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
    
    const resultsPerPage = 8;
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
            products,
            productCount
        }
    });
});

// GET product details
exports.getProductDetails = catchAsyncErrors(async (req, res, next) => {
    console.log(req.params.id);
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


// create new / update review
exports.upsertProductReview = catchAsyncErrors(async (req, res, next) => {
    
    const { rating, comment, productId } = req.body;

    const review = {
        user: req.user._id,
        name: req.user.name,
        rating: Number(rating),
        comment
    };

    const product = await Product.findById(productID);
    const isReviewed = product.reviews.find(rev => rev.user.toString() === req.user._id.toString());
    
    if (isReviewed) {
        product.reviews.forEach(rev => {
            if(rev.user.toString() === req.user._id.toString()) 
                (rev.rating = rating), (rev.comment = comment)
            });
    } else {
        product.reviews.push(review);
        product.numberOfReviews = product.reviews.length
    }


    // average ratings
    let avg = 0;
    product.reviews.forEach(rev => {
        avg += rev.rating
    }) 
    product.ratings = avg / product.reviews.length;
    
    await product.save({ validateBeforeSave: false});

    res.status(200).json({
        success: true
    })
});


// GET all reviews
exports.getProductReviews = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.findById(req.query.id);

    if (!product) {
        return next(new ErrorHandler("Product not found", 404));
    }

    res.status(200).json({
        success: true,
        reviews: product.reviews
    })
});


// DELETE Reviews
exports.deleteReview = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.findById(req.query.productId);

    if (!product) {
        return next(new ErrorHandler("Product not found", 404));
    }

    const reviews = product.reviews.filter( rev => rev._id.toString() !== req.query.idtoString());

    // average ratings
    let avg = 0;
    reviews.forEach(rev => {
        avg += rev.rating
    }) 
    const ratings = avg / reviews.length;
    const numOfReviews = reviews.length;

    await Product.findByIdAndUpdate(req.query.productId, {
        reviews,
        ratings,
        numOfReviews
    }, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });

    res.status(200).json({
        success: true,
    })
});