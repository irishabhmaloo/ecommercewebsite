const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please Enter Your Name"],
        maxlength: [30, "Name cannot exceed 30 characters"],
        minlength: [4, "Name Should Have Atlease 8 characters"]
    },
    email: {
        type: String,
        required: [true, "Please Enter Your Email"],
        unique: true,
        validate: [validator.isEmail, "Please Enter A Valid Email"]
    },
    password: {
        type: String,
        required: [true, "Please Enter Your Password"],
        minlength: [8, "Password Should Be Greater Than 8 characters"],
        select: false // dont display password when find() is called
    },
    avatar: {
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }
    },
    role: {
        type: String,
        default: "user"
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },

    resetPasswordToken: String,
    resetPasswordExpire: Date
});

// before saving, we convert password to hash
userSchema.pre('save', async function(next) {
    if (!this.isModified("password")) {
        next();
    }

    this.password = await bcrypt.hash(this.password, 10);
});


// JWT TOKEN : method
userSchema.methods.getJWTToken = function () {
    return jwt.sign({id: this._id}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE
    });
    // process.env.JWT_SECRET : can access your website anyone who has this key
};

// Compare Password
userSchema.methods.comparePassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};


// Genereting Password Reset Token
userSchema.methods.getResetPasswordToken = function() {
    
    // generating token
    const resetToken = crypto.randomBytes(20).toString("hex");

    // Hashing and adding to user schema
    this.resetPasswordToken = crypto
        .createHash("sha256")
        .update(resetToken)
        .digest("hex");

    this.resetPasswordExpire = Date.now() + 15 * 60 * 1000; // after 15 mins

    return resetToken;
};


module.exports = mongoose.model("User", userSchema);