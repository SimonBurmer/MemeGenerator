import React from 'react';
import "./NoMemesYet.css"
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import {Link} from "react-router-dom";

function NoMemesYet({isUserProfile}) {
    const overviewText = "Es gibt noch keine Memes... Sei der erste der ein Meme erstellt!";
    const userprofileText = "Du hast noch kein Meme erstellt... Klicke hier!";
    return (
        <Container>
            <Row className={"justify-content-center"}>
                <Col xs={12} md={8} lg={6} className="text-center">
                    <p className={"text-center h1 mt-5 mb-5"}>{isUserProfile ? userprofileText : overviewText}</p>
                    <Link to="/editor">
                        <Button variant={"outline-info"} size={"lg"}>Meme Erstellen!</Button>
                    </Link>
                </Col>
            </Row>
        </Container>
    );
}

export default NoMemesYet;