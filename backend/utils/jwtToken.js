// creating token and saving in cookie

const sendToken = (user, statusCode, res) => {
    const token = user.getJWTToken();

    // options for cookies
    const options = {
        expires: new Date(
            Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
        ),
        httponly: true,
        sameSite: 'None', // Set SameSite attribute to allow cross-site cookies
        secure: process.env.NODE_ENV === 'production' // Add Secure attribute for HTTPS
    }

    res.status(statusCode).cookie('token', token, options).json({
        success: true,
        user,
        token
    });
}

module.exports = sendToken;