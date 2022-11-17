const express = require("express");
const { getOrderAmount } = require("../Controllers/orderAmoutController");

const router = express.Router();

const stripe = require("stripe")(process.env.STRIPE_SK);

// Crear intento de pago
router.post("/", async (req, res) => {
  try {
    const products = req.body;

    const paymentIntent = await stripe.paymentIntents.create({
      amount: await getOrderAmount(products),
      currency: "usd",
    });

    res.send({
      status: 1,
      message: "Payment processed successfully",
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    res.status(500).json({ status: 0, message: error.message });
  }
});

module.exports = router;
