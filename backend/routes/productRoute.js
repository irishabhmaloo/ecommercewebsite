const express = require('express');
const { getAllProducts, createProduct, updateProduct, deleteProduct } = require('../controllers/productController');
const { isAuthenticator, authorizeRoles } = require('../middleware/auth');

const router = express.Router();

router.route("/products").get(getAllProducts);
router.route("/products/new").post(isAuthenticator, authorizeRoles("admin"), createProduct);
router.route("/products/:id")
    .patch(isAuthenticator, authorizeRoles("admin"), updateProduct)
    .delete(isAuthenticator, authorizeRoles("admin"), deleteProduct);

module.exports = router;