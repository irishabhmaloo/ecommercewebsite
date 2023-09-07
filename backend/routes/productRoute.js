const express = require('express');
const { getAllProducts, createProduct, updateProduct, deleteProduct, getProductDetails, getProductReviews, deleteReview, upsertProductReview } = require('../controllers/productController');
const { isAuthenticator, authorizeRoles } = require('../middleware/auth');

const router = express.Router();

router.route("/products").get(getAllProducts);
router.route("/admin/product/new").post(isAuthenticator, authorizeRoles("admin"), createProduct);
router.route("/admin/product/:id")
    .patch(isAuthenticator, authorizeRoles("admin"), updateProduct)
    .delete(isAuthenticator, authorizeRoles("admin"), deleteProduct);

router.route("product/:id").get(getProductDetails);
router.route("/review").put(isAuthenticator, upsertProductReview);

router.route("/reviews")
    .get(getProductReviews)
    .delete(isAuthenticator, deleteReview);

module.exports = router;