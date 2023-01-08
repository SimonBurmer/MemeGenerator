import React, { useState } from "react";
import {
  Navbar,
  Form,
  Nav,
  Container,
  Button,
  ButtonGroup,
} from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import {
  AiOutlineHome,
  AiOutlineFundProjectionScreen,
  AiOutlineUser,
  AiOutlineEdit,
} from "react-icons/ai";
import { useLoggedInStore } from "../app/store";

function TopNavigationBar(props) {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState(
    localStorage.getItem("loginData")
      ? JSON.parse(localStorage.getItem("loginData"))
      : null
  );

  const loginState = useLoggedInStore((state) => state.loggedIn);
  const logout = useLoggedInStore((state) => state.logout);

  // TODO redirect after logout
  const handleLogoutClick = () => {
    localStorage.clear();
    logout();
    navigate("/");
  };

  const authButton = () => {
    if (!loginState) {
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
        {authButton()}
      </Form>
    </Navbar>
  );
}

export default TopNavigationBar;
