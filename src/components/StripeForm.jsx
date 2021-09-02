import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const formatPrice = ({ amount, currency, quantity }) => {
  const numberFormat = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    currencyDisplay: "symbol",
  });
  const parts = numberFormat.formatToParts(amount);
  let zeroDecimalCurrency = true;
  for (let part of parts) {
    if (part.type === "decimal") {
      zeroDecimalCurrency = false;
    }
  }
  amount = zeroDecimalCurrency ? amount : amount / 100;
  const total = (quantity * amount).toFixed(2);
  return numberFormat.format(total);
};

const StripeForm = (props) => {
  const [quantity, setQuantity] = useState(1);
  const [amount, setAmount] = useState(0);
  const [currency, setCurrency] = useState("USD");

  useEffect(() => {
    async function fetchConfig() {
      const { unitAmount, currency } = await fetch("/config").then((r) =>
        r.json()
      );
      setAmount(unitAmount);
      setCurrency(currency);
    }
    fetchConfig();
  }, []);
/*
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton onClick={props.toggleShowPay}>
        <Modal.Title id="contained-modal-title-vcenter">Pay </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form action="/create-checkout-session" method="POST">
          <Form.Group size="lg" controlId="username">
            <Form.Label>Credit Card Number</Form.Label>
            <Form.Control
              autoFocus
              type="text"
              onChange={(e) => setUsername(e.target.value)}
            />
          </Form.Group>
          <Form.Group size="lg" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          {messageDiv}
          <Button block size="lg" type="submit" disabled={!validateForm()}>
            REGISTER
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
*/
};

export default StripeForm;
