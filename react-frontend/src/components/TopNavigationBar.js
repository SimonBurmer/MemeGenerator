import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import auth from "../services/authService";
import {
  Navbar,
  Form,
  Nav,
  Container,
  Button,
  ButtonGroup,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import {
  AiOutlineHome,
  AiOutlineFundProjectionScreen,
  AiOutlineUser,
  AiOutlineEdit,
} from "react-icons/ai";

function TopNavigationBar(props) {
  let [isLogedIn, setIsLogedIn] = useState(false);
  // TODO redirect after logout
  const handleLogoutClick = () => {
    Cookies.remove("jwt");
    authButton();
  };

  let Button = (props) => {
    return (
      <button type="button" onClick={props.onClick}>
        {props.isLogedIn ? "log out" : "log in"}
      </button>
    );
  };

  let handleClick = () => {
    setIsLogedIn(!isLogedIn);
  };

  const authButton = () => {
    const cookieJwt = Cookies.get("jwt");
    if (!cookieJwt) {
      return (
        <ButtonGroup>
          <Button variant="secondary" as={Link} to="/login">
            Login
          </Button>
          <Button variant="secondary" as={Link} to="/signup">
            Signup
          </Button>
        </ButtonGroup>
      );
    } else {
      return (
        <Button variant="secondary" onClick={handleLogoutClick}>
          Logout
        </Button>
      );
    }
  };

  return (
    <Navbar expand="md">
      <Container>
        <Navbar.Brand href="/" className="d-flex">
          OMM Memes
        </Navbar.Brand>
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ms-auto" defaultActiveKey="#home">
            <Nav.Item>
              <Nav.Link as={Link} to="/">
                <AiOutlineHome style={{ marginBottom: "2px" }} /> Home
              </Nav.Link>
            </Nav.Item>

            <Nav.Item>
              <Nav.Link as={Link} to="/editor">
                <AiOutlineEdit style={{ marginBottom: "2px" }} /> Editor
              </Nav.Link>
            </Nav.Item>

            <Nav.Item>
              <Nav.Link as={Link} to="/overview">
                <AiOutlineFundProjectionScreen
                  style={{ marginBottom: "2px" }}
                />{" "}
                Overview
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link as={Link} to="/profile">
                <AiOutlineUser style={{ marginBottom: "2px" }} />
                Profile
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Container>
      <Form inline className="mx-3">
        <Button isLogedIn={isLogedIn} onClick={handleClick} />
      </Form>
    </Navbar>
  );
}

export default TopNavigationBar;
