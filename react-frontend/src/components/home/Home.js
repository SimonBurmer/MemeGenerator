import React from "react";
import Col from "react-bootstrap/esm/Col";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import './Home.css';

function Home() {
  return (
      <Container className="index-root">
        <Row>
          <Col>
            <h1>Welcome back "current Username if logged in"</h1>
          </Col>
        </Row>
        <Row className="index-fast-actions-container">
          <Col className="index-fast-actions shadow rounded">
                Create new Meme
          </Col>
          <Col className="index-fast-actions shadow rounded">
            <Container>
                Search for Memes
            </Container>
          </Col>
          <Col className="index-fast-actions shadow rounded">
            <Container>
                View Profil
            </Container>
          </Col>
        </Row>
        <Row>
          <Col>
            <h4 className="index-header">
              Latest public memes
            </h4>
            <Container className="index-container">
                Hier kommen die neuesten public memes rein im gleiche Template wie im Overview etc.
            </Container>
          </Col>
        </Row>
        <Row>
          <Col>
            <h4 className="index-header">
              Latest Users
            </h4>
            <Container className="index-container">
                Hier kommen die neuesten Nutzer rein
            </Container>
          </Col>
        </Row>
        <Row>
          <Col>
            <h4 className="index-header">
              Most popular memes
            </h4>
            <Container className="index-container">
                Hier kommen die am meisten gelikten public memes rein im gleiche Template wie im Overview etc.
            </Container>
          </Col>
        </Row>
      </Container>
    );
}

export default Home;