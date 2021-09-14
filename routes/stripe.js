const express = require("express");
const stripeRouter = express.Router();
const Stripe = require("stripe");
const stripe = new Stripe(process.env.STRIPE_KEY);

stripeRouter.post("/pay", async (req, res, next) => {
  try {
    const payment = await stripe.paymentIntents.create({
      amount: total,
      currency: "USD",
      payment_method: id,
      confirm: true,
    });
    return res.status(200).send({ orderId, payment });
  } catch (error) {
    throw error;
  }
});

module.exports = stripeRouter;
