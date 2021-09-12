import React from "react";
import { BrowserRouter as Router, Route, useHistory } from "react-router-dom";
import OrderData from "./OrderData";
import UserData from "./UserData";
import Button from "react-bootstrap/Button";
import StripeCheckout from "react-stripe-checkout";
const STRIPE_KEY = process.env.STRIPE_KEY;

const Checkout = ({ currentUser }) => {
  // useEffect((id) => {
  //   getCartByUser();
  // });

  const history = useHistory();

  async function onToken(token) {
    try {
      const response = fetch("/save-stripe-token", {
        method: "POST",
        body: JSON.stringify(token),
      });
      const data = response.json();
      return data;
    } catch (error) {
      console.error(error);
    } finally {
      history.push("/orders/orderId"); //will end up being a variable
    }
  }

  return (
    <div className="checkoutForm">
      <h1>Checkout</h1>
      {/* <UserData currentUser={currentUser} /> */}
      <OrderData />
      <StripeCheckout stripeKey={STRIPE_KEY} onToken={onToken}>
        <Button>Complete Order</Button>
      </StripeCheckout>
      <Button>Cancel Order</Button>
    </div>
  );
};

export default Checkout;
