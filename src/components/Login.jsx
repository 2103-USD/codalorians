import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { storeCurrentUser } from "./auth/auth";
import { LoginUser } from "./api/index";
import "bootstrap/dist/css/bootstrap.min.css";

const Login = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginMessage, setLoginMessage] = useState(null);
  const { setCurrentUser } = props;


  function validateForm() {
    return username.length > 0 && password.length > 0;
  }

  const messageDiv = loginMessage ? (
    <div className="message">{loginMessage}</div>
  ) : (
    ""
  );

  async function handleSubmit(event) {
    event.preventDefault();
    setLoginMessage(null);
    try {
     /* const result = await loginUser(username, password); 
      if (result.user) {
        handleLogin(result);
        setLoginMessage(result.message);
      }*/
    } catch (error) {
      setLoginMessage("Username or Password Invalid.");
    }
  }


  async function handleLogin(result) {
    await storeCurrentUser(result.user);
    await setCurrentUser(result.user);
  }

  return (
    <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header closeButton onClick={props.toggleShowLogin}>
        <Modal.Title id="contained-modal-title-vcenter">
          Login
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group size="lg" controlId="username">
            <Form.Label>Username</Form.Label>
            <Form.Control
              autoFocus
              type="text"
              value={username}
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
            Login
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default Login;
