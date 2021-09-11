import React, { useState } from "react";
import {
  Nav,
  Navbar,
  Image,
  Button,
  InputGroup,
  FormControl,
  ButtonGroup,
} from "react-bootstrap";
import Login from "./Login";
import Register from "./Register";
import Container from "react-bootstrap/Container";
import logo from "./images/CONGO.svg";
import Cart from "./images/Cart.png";
import Home from "./images/home.png";
import "bootstrap/dist/css/bootstrap.min.css";
import SearchBar from "./SearchBar";

const NavBar = ({ handleLogin, handleLogout, currentUser, handleRegister }) => {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  function toggleShowLogin() {
    setShowLogin(!showLogin);
  }

  function toggleShowRegister() {
    setShowRegister(!showRegister);
  }

  return (
    <Navbar bg="dark" variant="dark" style={{ zIndex: "2", height: "110px" }}>
      <Navbar.Brand>
        {" "}
        <img
          src={logo}
          width="150px"
          height="150px"
          margin="0px"
          padding="5px"
        />
      </Navbar.Brand>

      {currentUser ? (
        <>
          <Nav>
            <Nav.Link href="/AllProducts">
              <img src={Home} width="40px" height="40px" />
            </Nav.Link>
          </Nav>
          <SearchBar />
          <ButtonGroup>
            <Button variant="secondary" className="mr-2" onClick={handleLogout}>
              Logout
            </Button>
          </ButtonGroup>
          <Nav.Link href="/Cart">
            <img src={Cart} width="50px" height="50px" />
          </Nav.Link>
        </>
      ) : (
        <>
          <Nav>
            <Nav.Link href="/AllProducts">
              <img src={Home} width="40px" height="40px" />
            </Nav.Link>
          </Nav>
          <SearchBar />
          <Nav>
            <ButtonGroup>
              <Button
                variant="secondary"
                className="mr-2"
                onClick={toggleShowLogin}
              >
                Login
              </Button>
              {showLogin && (
                <Login
                  toggleShowLogin={toggleShowLogin}
                  handleLogin={handleLogin}
                  show={showLogin}
                />
              )}
              <Button
                variant="primary"
                className="mr-2"
                onClick={toggleShowRegister}
              >
                Register
              </Button>
              {showRegister && (
                <Register
                  toggleShowRegister={toggleShowRegister}
                  handleRegister={handleRegister}
                  show={showRegister}
                />
              )}
            </ButtonGroup>
            <Nav.Link href="/Cart">
              <img src={Cart} width="50px" height="50px" />
            </Nav.Link>
          </Nav>
        </>
      )}
    </Navbar>
  );
};

export default NavBar;
