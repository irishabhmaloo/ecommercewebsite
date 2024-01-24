const express = require('express');
const { registerUser, loginUser, logoutUser, forgetPassword, resetPassword, getUserDetails, updatePassword, updateProfile, updateUserRole, deleteUser, getSingleUser, getAllUsers } = require('../controllers/userController');
const { isAuthenticator, authorizeRoles } = require("../middleware/auth");

const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/password/forgot").post(forgetPassword);
router.route("/password/reset/:token").put(resetPassword);
router.route("/logout").get(logoutUser);

router.route("/me").get(isAuthenticator, getUserDetails);
router.route("/password/update").put(isAuthenticator, updatePassword);
router.route("/me/update").put(isAuthenticator, updateProfile);

router.route("/admin/users").get(isAuthenticator, authorizeRoles("admin"), getAllUsers);
router.route("/admin/user/:id")
    .get(isAuthenticator, authorizeRoles("admin"), getSingleUser)
    .patch(isAuthenticator, authorizeRoles("admin"), updateUserRole)
    .delete(isAuthenticator, authorizeRoles("admin"), deleteUser);

module.exports = router;