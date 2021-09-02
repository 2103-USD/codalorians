import React, { useState, useEffect } from "react";
import { getOrders } from "./api";
import OrderData from "./OrderData";

const Cart = ({ currentUser }) => {
  const { id, username } = currentUser;
  const [cart, setCart] = useState([]);
  const [addedToCart, setAddedToCart] = useState(false);
  const [order, setOrder] = useState({});

  /*
  useEffect(
    (id) =>
      getOrders()
        .then(setOrdersList(orders))
        .catch((error) => console.error(error))[currentUser]
  );
 */
  return cart.length > 0 ? (
    <div>
      <h2>Your cart currently has {cart.length} items</h2>
      {cart.map((order, index) => {
        return <OrderData id={order.id} />;
      })}
    </div>
  ) : (
    <div>
      <h2>Your Cart is Currently Empty</h2>
    </div>
  );
};

export default Cart;
