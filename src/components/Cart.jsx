import React, { useState, useEffect } from "react";
import { getOrders } from "./api";
import Button from "react-bootstrap/Button";
import OrderData from "./OrderData";




const Cart = ({ currentUser }) => {
  //const { id, username } = currentUser;
  const [cart, setCart] = useState([]);
  const [addedToCart, setAddedToCart] = useState(false);
  const [order, setOrder] = useState({});
  const [ordersList, setOrdersList] = useState([]);


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
    </div>
  );
};

export default Cart;
