import React from "react";
import { Card, ListGroup, ListGroupItem, Button } from "react-bootstrap";

const UsersCard = (props) => {

const {email, firstname, lastname, imageurl, username, id} = props.user;

return (
<Card key={id}style={{width: "18rem", margin: "1rem"}}>
  <Card.Img variant="top" src={imageurl} height="180px" width="180px" />
  <Card.Body>
    <Card.Title>{username}</Card.Title>
    <Card.Text>
      Some quick example text to build on the card title and make up the bulk of
      the card's content.
    </Card.Text>
  </Card.Body>
  <ListGroup className="list-group-flush">
    <ListGroupItem>{firstname}</ListGroupItem>
    <ListGroupItem>{lastname}</ListGroupItem>
    <ListGroupItem>{email}</ListGroupItem>
  </ListGroup>
  <Card.Body>
    <Card.Link href="#"><Button>Edit</Button></Card.Link>
    <Card.Link href="#"><Button>Details</Button></Card.Link>
  </Card.Body>
</Card>
);
}


export default UsersCard