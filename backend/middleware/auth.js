const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("./catchAsyncErrors");
const jwt = require("jsonwebtoken");
const User = require('../models/userModel');

// Authenticate User
exports.isAuthenticator = catchAsyncErrors(async (req, res, next) => {

    const { token } = req.cookies;
    // console.log(token);

    if (!token) {
        return next(new ErrorHandler("Please Login To Access This Resource", 401));
    }

    // we created encoded data in userModel using id: JWT TOKEN METHOD
    const decodedData = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(decodedData.id);
    next();
});

// Authorize User
exports.authorizeRoles = (...roles) => {
    // ...roles is and array

    return (req, res, next) => {
        // this req.user.role is set up in the above authenticator function
        if(!roles.includes(req.user.role)) {
            return next(new ErrorHandler (
                `Role: ${req.user.role} is not allowed to access this resource`, 403
            ));
        }
    }

    next();
};