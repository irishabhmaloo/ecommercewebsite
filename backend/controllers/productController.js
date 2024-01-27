const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const Product = require('../models/productModel');
const ApiFeatures = require('../utils/apiFeatures');
const ErrorHandler = require('../utils/errorHandler');
const cloudinary = require("cloudinary");

// CREATE product -- ADMIN
exports.createProduct = catchAsyncErrors(async (req, res, next) => {

    let images = [];
    images = JSON.parse(req.body.image);

    // if (typeof req.body.image === "string") // single image
    // {
    //     images.push(req.body.image);
    // } else // array of images
    // {
    //     images = req.body.image;
    // }

    const imagesLinks = [];

    // upload images on cloudinary
    for (let i = 0; i < images.length; i++) {

        const result = await cloudinary.v2.uploader.upload(images[i], {
            folder: "products",
        });

        imagesLinks.push({
            public_id: result.public_id,
            url: result.secure_url,
        });
    }

    req.body.image = imagesLinks;
    req.body.user = req.user.id;

    const product = await Product.create(req.body);

    res.status(201).json({
        success: true,
        product,
    });
});

// GET all products
exports.getAllProducts = catchAsyncErrors(async (req, res, next) => {

    const resultsPerPage = 8;
    const productsCount = await Product.countDocuments();

    const apiFeature = new ApiFeatures(Product.find(), req.query)
        .search()
        .filter().pagination(resultsPerPage);

    const products = await apiFeature.query;
    let filteredProductsCount = products.length;

    res.status(200).json({
        status: "success",
        data: {
            productsCount,
            products,
            productsCount,
            resultsPerPage,
            filteredProductsCount
        }
    });
});

// Get All Product (Admin)
exports.getAdminProducts = catchAsyncErrors(async (req, res, next) => {

    const products = await Product.find();

    res.status(200).json({
        success: true,
        products,
    });
});

// GET product details
exports.getProductDetails = catchAsyncErrors(async (req, res, next) => {
    // console.log(req.params.id);
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

    // Images Update
    let images = [];

    if (typeof req.body.images === "string") {
        images.push(req.body.images);
    } else {
        images = req.body.images;
    }

    if (images !== undefined) {
        // Deleting Images From Cloudinary
        for (let i = 0; i < product.image.length; i++) {
            await cloudinary.v2.uploader.destroy(product.image[i].public_id);
        }

        const imagesLinks = [];

        for (let i = 0; i < images.length; i++) {
            const result = await cloudinary.v2.uploader.upload(images[i], {
                folder: "products",
            });

            imagesLinks.push({
                public_id: result.public_id,
                url: result.secure_url,
            });
        }

        req.body.image = imagesLinks;
    }

    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        useFindAndModify: false,
        runValidators: true
    });

    res.status(200).json({
        status: "success",
        product
    });
});

// DELETE product -- ADMIN
exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.findById(req.params.id);

    if (!product) {
        return next(new ErrorHandler("Product not found", 404));
    }

    // Deleting Images From Cloudinary
    for (let i = 0; i < product.image.length; i++) {
        await cloudinary.v2.uploader.destroy(product.image[i].public_id);
    }

    await Product.deleteOne({ _id: req.params.id });
    // await product.remove();

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

    const product = await Product.findById(productId);
    const isReviewed = product.reviews.find(rev => rev.user.toString() === req.user._id.toString());

    if (isReviewed) {
        product.reviews.forEach(rev => {
            if (rev.user.toString() === req.user._id.toString())
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

    await product.save({ validateBeforeSave: false });

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

    const reviews = product.reviews.filter(rev => rev._id.toString() !== req.query.id.toString());

    // average ratings
    let avg = 0;
    reviews.forEach(rev => {
        avg += rev.rating
    })

    let ratings = 0;
    if (reviews.length === 0) {
        ratings = 0
    } else {
        ratings = avg / reviews.length;
    }

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