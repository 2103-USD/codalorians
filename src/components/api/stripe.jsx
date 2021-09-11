import axios from "axios";
const STRIPE_KEY = process.env.STRIPE_KEY;
const Stripe = require('stripe')({STRIPE_KEY});


export const sendStripePayment = async ({id, orderCheckOut}) => {
    try {
    const { data } = await axios.post('/api/stripe', {id, orderCheckOut});
    return data;
    } catch (error) {
    throw error;
    }
}
