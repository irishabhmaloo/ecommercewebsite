const express = require("express");
const { newOrder, getSingleOrder, myOrders, getAllOrders, updateOrder, deleteOrder } = require("../controllers/orderController");
const { isAuthenticator, authorizeRoles } = require("../middleware/auth");

const router = express.Router();

router.route("/order/new").post(isAuthenticator, newOrder);
router.route("/order/:id").get(isAuthenticator, getSingleOrder);
router.route("/orders/me").get(isAuthenticator, myOrders);

router
  .route("/admin/orders")
  .get(isAuthenticator, authorizeRoles("admin"), getAllOrders);

router
  .route("/admin/order/:id")
  .put(isAuthenticator, authorizeRoles("admin"), updateOrder)
  .delete(isAuthenticator, authorizeRoles("admin"), deleteOrder);

module.exports = router;