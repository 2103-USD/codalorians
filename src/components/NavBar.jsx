import React, { useState } from "react";
import Button  from "react-bootstrap/Button";
import Navbar from "react-bootstrap/Navbar";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Nav from "react-bootstrap/Nav";
import Login from "./Login";
import Register from "./Register";
import Container from "react-bootstrap/Container";
import logo from "./images/image.png";
import 'bootstrap/dist/css/bootstrap.min.css';

const NavBar = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  function toggleShowLogin() {
    setShowLogin(!showLogin);
  }

  function toggleShowRegister() {
    console.log("clicked")
    setShowRegister(!showRegister);
  }

  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">
            <img
              src={logo}
              width="30"
              height="30"
              className="d-inline-block align-top"
              alt="logo"
            />
            <Nav className="me-auto">
              <Nav.Link href="/AllProducts">Home</Nav.Link>
              <Nav.Link href="/AllProducts">Products</Nav.Link>
              <Nav.Link href="/Cart">Cart</Nav.Link>
              <InputGroup>
                <InputGroup.Text>Search</InputGroup.Text>
                <FormControl as="textarea" aria-label="With textarea" />
              </InputGroup>
              <ButtonGroup aria-label="Basic example">
                <Button variant="secondary" onClick={toggleShowLogin}>
                  Login
                </Button>
                {showLogin && <Login toggleShowLogin={toggleShowLogin} show={showLogin} />}
                <Button variant="primary" onClick={toggleShowRegister}>Register</Button>
                {showRegister && <Register toggleShowRegister={toggleShowRegister} show={showRegister} />}
              </ButtonGroup>
            </Nav>
          </Navbar.Brand>
        </Container>
      </Navbar>
    </>
  );
};

export default NavBar;
