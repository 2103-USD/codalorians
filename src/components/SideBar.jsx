import React from "react";
import { Link } from "react-router-dom";
import { Nav, Container, Button } from "react-bootstrap";
import userImg from "./images/User.png";

const Sidebar = (props) => {
  const { showSideBar, toggleSideBar, currentUser } = props;
  return (
    <div
      className={showSideBar ? "sidebar sidebar--expanded" : "sidebar"}
      onMouseEnter={toggleSideBar}
    >
      <Container className="link-container">
        {currentUser.username ? (
          <>
            {" "}
            <h1>Hello {currentUser.username}!</h1>{" "}
            <img
              src={
                currentUser.imageurl ? (
                  currentUser.imageurl
                ) : (
                  <img src={userImg} />
                )
              }
            />{" "}
          </>
        ) : (
          <>
            {" "}
            <h1> Hello Guest!</h1>
            <img src={userImg} height="180px" width="180px" />{" "}
          </>
        )}
        <Nav
          style={{
            display: "inline-block",
          }}
          className="d-grid gap-2"
        >
          <Nav.Link as={Link} to="/">
            <Button variant="primary" size="lg">
              Home
            </Button>
          </Nav.Link>
          <Nav.Link as={Link} to="/AllProducts">
            <Button variant="primary" size="lg">
              Products
            </Button>
          </Nav.Link>
          {currentUser.id ? (
            <Nav.Link as={Link} to="/Cart">
              <Button variant="primary" size="lg">
                Profile
              </Button>
            </Nav.Link>
          ) : (
            ""
          )}
          {currentUser.isadmin ? (
            <Nav.Link
              style={{
                color: "black",
                textDecoration: "none",
              }}
              as={Link}
              to="/Admin"
            >
              <Button variant="success" size="lg">
                Admin
              </Button>
            </Nav.Link>
          ) : (
            ""
          )}
          <Nav.Link as={Link} to="/Cart">
            <Button variant="primary" size="lg">
              Cart
            </Button>
          </Nav.Link>
        </Nav>
      </Container>
    </div>
  );
};

export default Sidebar;
