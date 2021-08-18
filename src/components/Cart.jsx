import React, { useState, useEffect } from "react";
import { getOrders } from "../api";

const Cart = ({ currentUser }) => {
  const [ordersList, setOrdersList] = useState([]);
  const { id, username } = currentUser;

  useEffect(
    (id) =>
      getOrders()
        .then(setOrdersList(orders))
        .catch((error) => console.error(error))[currentUser]
  );

  return ordersList.length > 0 ? (
    <div>
      <h2>Your cart currently has {ordersList.length} items</h2>
      {ordersList.map((order, index) => {
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
