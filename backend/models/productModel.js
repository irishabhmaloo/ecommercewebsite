const mongoose = require('mongoose');

// defining products schema
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Product name required"],
        trim: true
    },
    description: {
        type: String,
        required: [true, "Product description required"]
    },
    price: {
        type: Number,
        required: [true, "Product price required"],
        maxlength: [8, "Price cannot exceed 8 characters"]
    },
    ratings: {
        type: Number,
        default: 0
    },
    image: [{
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }
    }],
    category: {
        type: String,
        required: [true, "Product category required"],
    },
    stock: {
        type: Number,
        required: [true, "Product stock required"],
        maxlength: [4, "Price cannot exceed 4 characters"],
        default: 1
    },
    numberOfReviews: {
        type: Number,
        default: 0
    },
    reviews: [
        {
            user: {
                type: mongoose.Schema.ObjectId,
                ref: "User",
                required:true
            },
            name: {
                type: String,
                required: true
            },
            rating: {
                type: Number,
                required: true
            },
            comment: {
                type: String,
                required: true
            }
        }
    ],

    // created by whom
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required:true
    },

    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Product", productSchema);