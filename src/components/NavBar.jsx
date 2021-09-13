import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Nav, Navbar, Button } from "react-bootstrap";
import logo from "./images/CONGO.svg";
import Cart from "./images/Cart.png";
import Home from "./images/Home.png";
import { Register, Login } from "./";
import "bootstrap/dist/css/bootstrap.min.css";
import SearchBar from "./SearchBar";

const NavBar = (props) => {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const { handleLogin, handleLogout, currentUser, handleRegister } = props;

  function toggleShowLogin() {
    setShowLogin(!showLogin);
  }

  function toggleShowRegister() {
    setShowRegister(!showRegister);
  }

  return (
    <Navbar
      bg="dark"
      variant="dark"
      style={{ zIndex: "2", display: "flex", height: "110px" }}
    >
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Navbar.Brand>
          {" "}
          <img
            src={logo}
            width="150px"
            height="150px"
            className="me-auto"
            padding="5px"
          />
        </Navbar.Brand>

        {currentUser.id ? (
          <>
            <Nav>
              <Nav.Link as={Link} to="/">
                <img
                  src={Home}
                  style={{ marginRight: "20px" }}
                  width="40px"
                  height="40px"
                />
              </Nav.Link>
            </Nav>
            <SearchBar />
            <Button
              variant="danger"
              size="lg"
              className="mx-5"
              onClick={handleLogout}
            >
              Logout
            </Button>
            <Nav.Link as={Link} to="/Cart">
              <img src={Cart} width="50px" height="50px" />
            </Nav.Link>
          </>
        ) : (
          <>
            <Nav>
              <Nav.Link as={Link} to="/">
                <img
                  src={Home}
                  style={{ marginRight: "20px" }}
                  width="40px"
                  height="40px"
                />
              </Nav.Link>
            </Nav>
            <SearchBar />
            <Nav>
              <Button variant="info" className="mx-2" onClick={toggleShowLogin}>
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
                className="mx-2"
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
              <Nav.Link as={Link} to="/Cart">
                <img src={Cart} width="50px" height="50px" />
              </Nav.Link>
            </Nav>
          </>
        )}
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;
