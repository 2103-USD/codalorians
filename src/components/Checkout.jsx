import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Button, Card, Form } from "react-bootstrap";
import { OrderData, UserData, CheckoutForm } from "./";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
const stripePromise = loadStripe(
  "pk_test_51JUj7UDh3o5GZx1A8vIc11Jk68TNGp67mAcT3Kq2n3tCUuzIt54R1M4rbqaKNP3FEU3tWJrV2QMPLpJURRRnSuET00IX4qh4Z2"
);

const Checkout = (props) => {
  const { currentUser } = props;
  return (
    <div style={{textAlign: "center"}}>
      <h1>Checkout</h1>
      <div style={{ display: "flex",  flexFlow: "row nowrap" }}>
      <Card className="ml-2">
        <Card.Title>Shipping Details</Card.Title>
        <UserData currentUser={currentUser} />
        <OrderData />
      </Card>
      <>
      <Card className="mx-5">
      <Card.Title>Payment Details</Card.Title>
      <Elements stripe={stripePromise}>
        <CheckoutForm />
      </Elements>
      </Card>
      </>
      </div>
    </div>
  );
};

export default Checkout;
