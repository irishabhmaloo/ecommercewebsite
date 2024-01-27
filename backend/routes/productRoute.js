const express = require('express');
const { getAdminProducts, getAllProducts, createProduct, updateProduct, deleteProduct, getProductDetails, getProductReviews, deleteReview, upsertProductReview } = require('../controllers/productController');
const { isAuthenticator, authorizeRoles } = require('../middleware/auth');

const router = express.Router();

router.route("/products").get(getAllProducts);
router
  .route("/admin/products")
  .get(isAuthenticator, authorizeRoles("admin"), getAdminProducts);

  router.route("/admin/product/new").post(isAuthenticator, authorizeRoles("admin"), createProduct);
  router.route("/admin/product/:id")
    .put(isAuthenticator, authorizeRoles("admin"), updateProduct)
    .delete(isAuthenticator, authorizeRoles("admin"), deleteProduct);

router.route("/products/:id").get(getProductDetails);
router.route("/review").put(isAuthenticator, upsertProductReview);

router.route("/reviews")
    .get(getProductReviews)
    .delete(isAuthenticator, deleteReview);

module.exports = router;