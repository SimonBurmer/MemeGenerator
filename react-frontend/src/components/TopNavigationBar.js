import React, { useState } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import { Link } from "react-router-dom";
import {
  AiOutlineHome,
  AiOutlineFundProjectionScreen,
  AiOutlineUser,
  AiOutlineEdit
} from "react-icons/ai";

function TopNavigationBar() {
  return (
    <Navbar
      expand="md"
    >
      <Container>
        <Navbar.Brand href="/" className="d-flex">
          OMM Memes
        </Navbar.Brand>
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ms-auto" defaultActiveKey="#home">
            <Nav.Item>
              <Nav.Link as={Link} to="/" >
                <AiOutlineHome style={{ marginBottom: "2px" }} /> Home
              </Nav.Link>
            </Nav.Item>

            <Nav.Item>
              <Nav.Link
                as={Link}
                to="/editor"
              >
                <AiOutlineEdit style={{ marginBottom: "2px" }} /> Editor
              </Nav.Link>
            </Nav.Item>

            <Nav.Item>
              <Nav.Link
                as={Link}
                to="/overview"
              >
                <AiOutlineFundProjectionScreen
                  style={{ marginBottom: "2px" }}
                />{" "}
                Overview
              </Nav.Link>
            </Nav.Item>

            <Nav.Item>
            <Nav.Link
                as={Link}
                to="/overview"
              >
              <AiOutlineUser style={{ marginBottom: "2px" }} /> 
                Profil
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default TopNavigationBar;