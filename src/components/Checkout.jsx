import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import OrderData from "./OrderData";
import UserData from "./UserData";

const Checkout = ({ currentUser }) => {
  return (
    <>
      <h1> Checkout</h1>
      <UserData currentUser={currentUser} />
      <OrderData />
      <button>Complete Order</button>
      <button>Cancel Order</button>
    </>
  );
};

export default Checkout;
