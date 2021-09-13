import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";

const UserData = (props) => {
  const { currentUser } = props;
  const { firstname, username, imageurl, email, lastname } = currentUser;
  const [guestFirstname, setFirstname] = useState("");
  const [guestLastname, setLastname] = useState("");
  const [guestEmail, setEmail] = useState("");
  return (
    <>
      {currentUser.id ? (
        <>
          <h2> {username}!</h2>
          <p> Email: {email}</p>
          <p> First Name: {firstname}</p>
          <p> Last Name: {lastname}</p>
        </>
      ) : (
        <>
          <h2> Guest </h2>
          <p>Please enter your information below or register"</p>
          <Form>
            <Form.Group size="lg" controlId="firstname" className="mb-3">
              <Form.Label>First name</Form.Label>
              <Form.Control
                autoFocus
                type="text"
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
              />
            </Form.Group>
            <Form.Group size="lg" controlId="lastname" className="mb-3">
              <Form.Label>Last name</Form.Label>
              <Form.Control
                autoFocus
                type="text"
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
              />
            </Form.Group>
            <Form.Group size="lg" controlId="email" className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                autoFocus
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
          </Form>
        </>
      )}
    </>
  );
};

export default UserData;
