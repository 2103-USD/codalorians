import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import {Button, Form} from "react-bootstrap";
import {OrderData, UserData} from "./";

const Checkout = (props) => {
  const {currentUser} = props;
  return (
    <Form>
      <h1>{currentUser.username ? currentUser.username : "Guest"} checkout</h1>
      <UserData currentUser={currentUser} />
      <OrderData />
      <Button size="sm">Complete Order</Button>
      <Button size="sm">Cancel Order</Button>
    </Form>
  );
};

export default Checkout;
