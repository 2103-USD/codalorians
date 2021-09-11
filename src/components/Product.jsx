import React, { useState } from "react";
import { Card, ListGroup, ListGroupItem, Form } from "react-bootstrap";
import AddToCartButton from "./AddToCartButton";
import RemoveFromCartButton from "./RemoveFromCartButton";

const Product = (product) => {
  const [quant, setQuant] = useState();
  const {
    productId,
    artist,
    ListIndex,
    name,
    description,
    price,
    imageurl,
    instock,
    category,
  } = product;
  const handleQuantity = (event) => {
    event.preventDefault();
    const productQuant = event.target.value;
    setQuant(productQuant);
  };

  return (
    <Card
      style={{ width: "18rem", marginBottom: "1rem" }}
      key={`productId${productId}`}
      ListIndex={ListIndex}
    >
      <Card.Img variant="top" src={imageurl} />
      <Card.Body>
        <Card.Title> {name}</Card.Title>
        <Card.Subtitle>{artist}</Card.Subtitle>
      </Card.Body>
      <ListGroup>
        <ListGroupItem> {category} </ListGroupItem>
        <ListGroupItem> Price: {price} </ListGroupItem>
        <ListGroupItem>
          {" "}
          Available: {instock ? "In Stock" : "Out of Stock"}{" "}
        </ListGroupItem>
        <ListGroupItem> Description: {description}</ListGroupItem>
        <br />
        <AddToCartButton productId={productId} price={price} quant={quant} />
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

export default Product;
