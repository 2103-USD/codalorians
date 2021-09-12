import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Checkout from "./Checkout";
import { getOrders } from "./api";
import Button from "react-bootstrap/Button";
import OrderData from "./OrderData";

const Cart = ({ currentUser }) => {
  const { id, username } = currentUser || {};
  const [cart, setCart] = useState([]);
  const [addedToCart, setAddedToCart] = useState(false);
  const [order, setOrder] = useState({});
  const [ordersList, setOrdersList] = useState([]);
  const [showCheckout, setShowCheckout] = useState();

  /*
  useEffect(
    (id) =>
      getOrders()
        .then(setOrdersList(orders))
        .catch((error) => console.error(error))[currentUser]
  );
 */

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
      <Link to="/Checkout">
        <Button>Checkout</Button>
      </Link>
      {showCheckout && <Checkout showCheckout={showCheckout} />}
    </div>
  );
};

export default Cart;
