import React, { useState } from "react";
import { Form, Button, Card } from "react-bootstrap";

const UserData = (props) => {
  const { currentUser } = props;
  const [guestFirstname, setFirstname] = useState("");
  const [guestLastname, setLastname] = useState("");
  const [guestEmail, setEmail] = useState("");
  return (
    <>
      <Card style={{ width: "18rem" }}>
        {currentUser.id ? (
          <>
            <h2> {currentUser.username}!</h2>
            <p> Email: {currentUser.email}</p>
            <p> First Name: {currentUser.firstname}</p>
            <p> Last Name: {currentUser.lastname}</p>
          </>
        ) : (
          <>
            <h2> Guest </h2>
            <p>Please enter your information below"</p>
            <Form>
              <Form.Group size="lg" controlId="firstname" className="mb-1">
                <Form.Label>First name</Form.Label>
                <Form.Control
                  autoFocus
                  type="text"
                  value={guestFirstname}
                  onChange={(e) => setFirstname(e.target.value)}
                />
              </Form.Group>
              <Form.Group size="lg" controlId="lastname" className="mb-1">
                <Form.Label>Last name</Form.Label>
                <Form.Control
                  autoFocus
                  type="text"
                  value={guestLastname}
                  onChange={(e) => setLastname(e.target.value)}
                />
              </Form.Group>
              <Form.Group size="lg" controlId="email" className="mb-1">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  autoFocus
                  type="text"
                  value={guestEmail}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>
            </Form>
          </>
        )}
      </Card>
    </>
  );
};

export default UserData;
