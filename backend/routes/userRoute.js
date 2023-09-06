const express = require('express');
const { registerUser, loginUser, logoutUser, forgetPassword, resetPassword } = require('../controllers/userController');

const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/password/forgot").post(forgetPassword);
router.route("/password/reset/:token").put(resetPassword);
router.route("/logout").post(logoutUser);

module.exports = router;