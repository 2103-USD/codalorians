import React, { useEffect, useState } from "react";
import { Card, ListGroup, ListGroupItem, Button, Form} from 'react-bootstrap';
import { NavLink } from "react-router-dom";
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
  const handleQuantity = async (event) => {
    event.preventDefault();
    const productQuant = event.target.value;
    setQuant(productQuant);
  };

  return (
    <Card style={{ width: '18rem', marginBottom: '1rem' }} key={`productId${productId}`} ListIndex={ListIndex}>
      <Card.Img variant="top" src={imageurl} />
      <Card.Body>
      <Card.Title> {name}</Card.Title>
      <Card.Subtitle>{artist}</Card.Subtitle>
      </Card.Body>
      <ListGroup>
      <ListGroupItem> {category} </ListGroupItem>
      <ListGroupItem> Price: {price} </ListGroupItem>
      <ListGroupItem> Available: {instock ? 'In Stock' : 'Out of Stock' } </ListGroupItem>
      <ListGroupItem> Description: {description}</ListGroupItem>
      <br />
      Quantity:
      <Form.Select onChange={handleQuantity}>
      <option value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
      <option value="4">4</option>
      <option value="5">5</option>
      <option value="6">6</option>
      <option value="7">7</option>
      <option value="8">8</option>
      <option value="9">9</option>
      <option value="10">10</option>
      </Form.Select>
      <div>
      <AddToCartButton productId={productId} price={price} quant={quant} />
      <RemoveFromCartButton />
      </div>
      </ListGroup>
    </Card>
  );
};

export default Product;
