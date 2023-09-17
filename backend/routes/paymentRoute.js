const express = require("express");
const {
  processPayment,
  sendStripeApiKey,
} = require("../controllers/paymentController");
const router = express.Router();
const { isAuthenticator} = require("../middleware/auth");

router.route("/payment/process").post(isAuthenticator, processPayment);
router.route("/stripeapikey").get(isAuthenticator, sendStripeApiKey);

module.exports = router;