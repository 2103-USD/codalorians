import React, { useState, useEffect } from "react";
import { getOrders } from "./api";
import Button from "react-bootstrap/Button";
import OrderData from "./OrderData";
import StripeForm from "./StripeForm";
import StripeCheckout from "react-stripe-checkout";
const STRIPE_KEY = process.env.STRIPE_KEY;

const Cart = ({ currentUser }) => {
  // const { id, username } = currentUser;
  const [cart, setCart] = useState([]);
  const [addedToCart, setAddedToCart] = useState(false);
  const [order, setOrder] = useState({});

  const [ordersList, setOrdersList] = useState([]);
  const [showPay, setShowPay] = useState([]);

  /*
  useEffect(
    (id) =>
      getOrders()
        .then(setOrdersList(orders))
        .catch((error) => console.error(error))[currentUser]
  );
 */

  function toggleShowPay() {
    setShowPay(!showPay);
  }

  async function onToken(token) {
    try {
      const response = fetch("/save-stripe-token", {
        method: "POST",
        body: JSON.stringify(token),
      });
      const data = response.json();
      return data;
      alert(`We are in business, ${data.email}`);
    } catch (error) {
      console.error(error);
    }
  }

  return ordersList.length > 0 ? (
    <div>
      <h2>Your cart currently has {cart.length} items</h2>
      {cart.map((order, index) => {
        return <OrderData id={order.id} />;
      })}
    </div>
  ) : (
    <div>
      <h2>Your Cart is Currently Empty</h2>
      <StripeCheckout stripeKey={STRIPE_KEY}>
        <Button>PAY</Button>
      </StripeCheckout>
      {/*UNDER CONSTRUCTION*/}
      {/*<Button toggleShowPay={toggleShowPay} classname="btn btn-primary">Pay</Button>*/}
      {/*showPay && <StripeForm token={onToken} stripeKey={STRIPE_KEY} />*/}
    </div>
  );
};

export default Cart;
