const ErrorHandler = require('../utils/errorHandler');

module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error";

    // Wrong MongoDB ID Error - Cast Error
    if (err.name === "CastError") {
        const message = `Resource not found. Invalid: ${err.path}`;
        err = new ErrorHandler(message, 400);
    };

    // Mongoose Duplicate Key Error
    if (err.code === 11000) {
        const message = `Duplicate: ${Object.keys(err.keyValue)}} Entered`;
        err = new ErrorHandler(message, 400);
    };

    // Wrong JWT error
    if (err.name === "JsonWebTokenError") {
        const message = `JSON Web Token is invalid, try again`;
        err = new ErrorHandler(message, 400);
    };

    // JWT expire error
    if (err.name === "JsonExpireError") {
        const message = `JSON Web Token is Expired, try again`;
        err = new ErrorHandler(message, 400);
    };

    res.status(err.statusCode).json({
        status: "fail",
        message: err.message
    })
}