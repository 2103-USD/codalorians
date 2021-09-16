import React from "react";
import {
  Nav,
  Navbar,
  Button,
  Container,
  Card,
  CardGroup,
} from "react-bootstrap";
import logo from "./images/CONGO.svg";
import AY from "./images/ayprof.svg";
import LN from "./images/linkedin.svg";
import GH from "./images/github.svg";
import AF from "./images/afprof.svg";
import ES from "./images/ezschow.svg";
import { Register, Login } from "./";
import "bootstrap/dist/css/bootstrap.min.css";
import SearchBar from "./SearchBar";
import CardHeader from "react-bootstrap/esm/CardHeader";

const Footer = () => {
  return (
    <>
      <Navbar bg="dark" style={{ position: "absolute", left: "0", right: "0" }}>
        <Container>
          <CardGroup style={{ marginLeft: "300px", color: "white" }}>
            <Card bg="dark" className="text-center">
              <Card.Img variant="top" src={AY} />
              <Card.Body>
                <Card.Title>"This should work"</Card.Title>
                <Card.Text>-Alex Yambao</Card.Text>
              </Card.Body>
              <Card.Footer>
                <Nav.Link>
                  <Card.Img height="40px" width="40px" src={LN} variant="" />
                </Nav.Link>
                <Nav.Link>
                  <Card.Img height="40px" width="40px" src={GH} variant="" />
                </Nav.Link>
              </Card.Footer>
            </Card>
            <Card bg="dark" className="text-center">
              <Card.Img variant="top" src={AF} />
              <Card.Body>
                <Card.Title>"Killing in the name of" </Card.Title>
                <Card.Text>-Anthony Fernan</Card.Text>
              </Card.Body>
              <Card.Footer>
                <Nav.Link>
                  <Card.Img height="40px" width="40px" src={LN} variant="" />
                </Nav.Link>
                <Nav.Link>
                  <Card.Img height="40px" width="40px" src={GH} variant="" />
                </Nav.Link>
              </Card.Footer>
            </Card>
            <Card bg="dark" className="text-center">
              <Card.Img variant="top" src={ES} />
              <Card.Body>
                <Card.Title>"Just one quick question"</Card.Title>
                <Card.Text>- Enzi Schow</Card.Text>
              </Card.Body>
              <Card.Footer>
                <Nav.Link>
                  <Card.Img height="40px" width="40px" src={LN} variant="" />
                </Nav.Link>
                <Nav.Link>
                  <Card.Img height="40px" width="40px" src={GH} variant="" />
                </Nav.Link>
              </Card.Footer>
            </Card>
          </CardGroup>
        </Container>
        <Navbar.Brand href="#home">
          <img
            alt=""
            src={logo}
            width="200px"
            height="200px"
            className="d-inline-block align-top"
          />{" "}
        </Navbar.Brand>
      </Navbar>
    </>
  );
};

export default Footer;
