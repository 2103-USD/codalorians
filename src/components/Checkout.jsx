import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import OrderData from "./OrderData";
import UserData from "./UserData";

const Checkout = () => {
  return (
    <>
      <Router>
        <Route>
          <UserData />
        </Route>
        <Route>
          <OrderData />
        </Route>
      </Router>
      <button>Complete Order</button>
      <button>Cancel Order</button>
    </>
  );
};

export default Checkout;
