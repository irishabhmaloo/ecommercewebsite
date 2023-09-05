const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const ErrorHandler = require('../utils/errorHandler');
const User = require('../models/userModel');
const sendToken = require('../utils/jwtToken');

// Register A User
exports.registerUser = catchAsyncErrors(async (req,res,next) => {
    const {name, email, password} = req.body;

    const user = await User.create({
        name, email, password,
        avatar: {
            public_id: "test",
            url: "testURL"
        }
    });

    sendToken(user, 201, res);
});

// Login A User
exports.loginUser = catchAsyncErrors(async (req,res,next) => {
    const {email, password} = req.body;

    // checking if user has given password and email both
    if (!email || !password) {
        return next(new ErrorHandler("Please Enter Email & Password" , 400));
    }

    const user = await User.findOne({email}).select("+password");

    // console.log(user);
    if (!user) {
        return next(new ErrorHandler("Invalid Enter Email & Password", 401));
    }

    const isPasswordMatched = await user.comparePassword(password);

    // console.log(isPasswordMatched);
    if (!isPasswordMatched) {
        return next(new ErrorHandler("Invalid Enter Email & Password", 401));
    }

    sendToken(user, 200, res);
});