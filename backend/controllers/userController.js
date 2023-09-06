const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const ErrorHandler = require('../utils/errorHandler');
const User = require('../models/userModel');
const sendToken = require('../utils/jwtToken');
const sendEmail = require('../utils/sendEmail');


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


// Logout A User
exports.logoutUser = catchAsyncErrors(async (req,res,next) => {
    res.cookie("token", null, {
        expires: Date.now(),
        httpOnly: true
    });

    res.status(200).json({
        success: true,
        message: "Logged Out"
    });
});


// Forget Password
exports.forgetPassword = catchAsyncErrors(async (req,res,next) => {
    const user = await User.findOne({email: req.body.email});

    if (!user) {
        return next(new ErrorHandler("User Not Found", 404));
    }
    
    // Get Reset Password Token
    const resetToken = user.getResetPasswordToken();
    await user.save({validateBeforeSave: false});

    const resetPasswordUrl = `${req.protocol}://${req.get("host")}/api/v1/password/reset/${resetToken}`;
    // eg: req.protocol = http / req.get("host") = localhost

    // to be sent in email
    const message = `Your password reset token is :- \n\n ${resetPasswordUrl} \n\nIf you have not requested this email the, please ignore it`;

    try {
        await sendEmail({
            email: user.email,
            subject: `${process.env.WEBSITE_NAME} Password Recovery`,
            message
        });

        res.status(200).json({
            success: true,
            message: `Email sent to ${user.email} successfully`,
        });

    } catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save({validateBeforeSave: false});
        return next(new ErrorHandler(error.message, 500));
    }
});


// Reset Password
exports.resetPassword = catchAsyncErrors(async (req,res,next) => {
    
    // creating token hash
    const resetPasswordToken = crypto
        .createHash("sha256")
        .update(req.params.token)
        .digest("hex");

    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() }
    });

    if (!user) {
        return next(new ErrorHandler("Reset Password Token Is Invalid Or Has Expired", 400));
    }

    if (req.body.password !== req.body.confirmPassword) {
        return next(new ErrorHandler("Password Does Not Match Confirm Password", 400));
    }

    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();
    sendToken(user, 200, res); // login user
});