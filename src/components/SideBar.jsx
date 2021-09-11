import React from "react";
import { Link } from "react-router-dom";
import { Nav, Container } from "react-bootstrap";
import UserData from "./UserData";

const Sidebar = ({ showSideBar, toggleSideBar, currentUser }) => {
  return (
    <div
      className={showSideBar ? "sidebar sidebar--expanded" : "sidebar"}
      onClick={toggleSideBar}
    >
      <Container className="link-container">
        {/*currentUser ? <UserData /> : <h1>Welcome Guest!</h1>*/}
        <Nav
          style={{
            display: "inline-block",
          }}
        >
          <Nav.Link
            style={{
              color: "black",
              textDecoration: "none",
            }}
            as={Link}
            to="/"
          >
            Home
          </Nav.Link>
          <Nav.Link
            style={{
              color: "black",
              textDecoration: "none",
            }}
            as={Link}
            to="/AllProducts"
          >
            Products
          </Nav.Link>
          <Nav.Link
            style={{
              color: "black",
              textDecoration: "none",
            }}
            as={Link}
            to="/Cart"
          >
            Cart
          </Nav.Link>
        </Nav>
      </Container>
    </div>
  );
};

export default Sidebar;
