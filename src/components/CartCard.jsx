import React, { useState } from "react";
import { Card, ListGroup, ListGroupItem, Form } from "react-bootstrap";
import RemoveFromCartButton from "./RemoveFromCartButton";
import { createOrder, addProductToOrder, getProductById } from "./api/index";
import {
  getCurrentUser,
  storeCurrentUser,
  getLocalCart,
  storeLocalCart,
} from "./auth/auth";


const CartCard = (props) => {
  const [quant, setQuant] = useState();

  const {
    product,
    setCurrentProduct,
    currentUser,
    cart,
    currentProduct,
    productId,
    setCart,
    index
  } = props;

  /* const {
    artist,
    name,
    description,
    price,
    imageurl,
    instock,
    category
  } = product;
  */

  const handleQuantity = (event) => {
    event.preventDefault();
    const productQuant = event.target.value;
    setQuant(productQuant);
  };

// handleRemoveFromCart

  return (
    <Card
      style={{ width: "18rem", marginBottom: "1rem" }}
      key={`productId${productId}`}
      ListIndex={index}
    >
      <Card.Img variant="top" src={product.imageurl} />
      <Card.Body>
        <Card.Title> {product.name}</Card.Title>
        <Card.Subtitle>{product.artist}</Card.Subtitle>
      </Card.Body>
      <ListGroup>
        <ListGroupItem> {product.category} </ListGroupItem>
        <ListGroupItem> Price: {product.price} </ListGroupItem>
        <ListGroupItem>
          {" "}
          Availability: {product.instock ? "In Stock" : "Out of Stock"}{" "}
        </ListGroupItem>
        <ListGroupItem> Description: {product.description}</ListGroupItem>
        <br />
        <Form.Label> Quantity {quant} </Form.Label>
        <Form.Range
          min="0"
          step="1"
          max="10"
          placeholder="0"
          onChange={(e) => handleQuantity(e)}
        />
        <div>
          <RemoveFromCartButton />
        </div>
      </ListGroup>
    </Card>
  );
};

export default CartCard;