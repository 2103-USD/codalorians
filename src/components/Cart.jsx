import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Checkout from "./Checkout";
import { getOrders } from "./api";
import Button from "react-bootstrap/Button";
import OrderData from "./OrderData";
import Nav from "react-bootstrap/Nav";

const Cart = ({ currentUser }) => {
  const { id, username } = currentUser || {};
  const [cart, setCart] = useState([]);
  const [addedToCart, setAddedToCart] = useState(false);
  const [order, setOrder] = useState({});
  const [showCheckout, setShowCheckout] = useState(false);

  const [ordersList, setOrdersList] = useState([]);
  const [showPay, setShowPay] = useState([]);

  // useEffect(
  //   (id) =>
  //     getOrders()
  //       .then(setOrdersList(orders))
  //       .catch((error) => console.error(error))[currentUser]
  // );

  // function toggleShowPay() {
  //   setShowPay(!showPay);
  // }

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
      {/* <Route>
        <Checkout currentUser={currentUser}>
          Checkout {username}'s order
        </Checkout>
      </Route> */}

      <Link to="/Checkout">
        <Button>Checkout</Button>
      </Link>
      {showCheckout && <Checkout showCheckout={showCheckout} />}
      {/*UNDER CONSTRUCTION*/}
      {/*<Button toggleShowPay={toggleShowPay} classname="btn btn-primary">Pay</Button>*/}
      {/*showPay && <StripeForm token={onToken} stripeKey={STRIPE_KEY} />*/}
    </div>
  );
};

export default Cart;
