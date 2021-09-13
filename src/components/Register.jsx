import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { registerUser } from "./api/index";
import { storeCurrentUser} from "./auth/auth";
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";

const Register = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [isadmin, setIsAdmin] = useState(false);

  const [registerMessage, setRegisterMessage] = useState(null);

  const { handleRegister } = props;
  const messageDiv = registerMessage ? (
    <div className="message">{registerMessage}</div>
  ) : (
    ""
  );

  function validateForm() {
    return username.length > 0 && password.length > 0;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setRegisterMessage(null);
    try {
      const result = await registerUser(
        firstname,
        lastname,
        email,
        username,
        password,
        isadmin
      );
      if (result) {
      await handleRegister(result);
      resetForm(event);
      }
      setRegisterMessage(result.message);
    } catch (error) {
      console.error(error);
      setRegisterMessage(
        "Registration unsuccessful. Duplicate Username, please choose another."
      );
    }
  }

function resetForm(event) {
  setUsername("");
  setPassword("");
  setFirstname("");
  setLastname("");
  setEmail("");
}


  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton onClick={props.toggleShowRegister} style={{backgroundColor:"#0d6efd"}} >
        <Modal.Title id="contained-modal-title-vcenter">Register</Modal.Title>
      </Modal.Header>
      <Modal.Body className="p-5">
        <Form onSubmit={handleSubmit}>
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
          <Form.Group size="lg" controlId="username" className="mb-3">
            <Form.Label>Username</Form.Label>
            <Form.Control
              autoFocus
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </Form.Group>
          <Form.Group size="lg" controlId="password" className="mb-3">
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
};

export default Register;
