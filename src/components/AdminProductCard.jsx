import React from "react";
import { Button, Card, ListGroup, ListGroupItem } from "react-bootstrap";

const AdminProductCard = (props) => {
  const { product } = props;
  const {
    productId,
    artist,
    name,
    description,
    price,
    imageurl,
    category,
  } = product;

  return (
    <Card key={productId} style={{ width: "18rem", margin: "1rem" }}>
      <Card.Img variant="top" src={imageurl} height="180px" width="180px" />
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Text>{description}</Card.Text>
      </Card.Body>
      <ListGroup className="list-group-flush">
        <ListGroupItem>{artist}</ListGroupItem>
        <ListGroupItem>{price}</ListGroupItem>
        <ListGroupItem>{category}</ListGroupItem>
      </ListGroup>
      <Card.Body>
        <Card.Link href="#">
          <Button>Edit</Button>
        </Card.Link>
        <Card.Link href="#">
          <Button>Details</Button>
        </Card.Link>
      </Card.Body>
    </Card>
  );
};

export default AdminProductCard;
