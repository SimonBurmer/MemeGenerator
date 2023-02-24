import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import React from "react";
import {Form} from "react-bootstrap";
import InputGroup from "react-bootstrap/InputGroup";
import {useEffect, useCallback, useState} from "react";
import TemplateService from "../../../../services/templateService";
import TemplateStatistics from "./statistics/TemplateStatistics";

function AddTemplates(props) {
    const [templates, setTemplates] = React.useState([]);
    const [selected, setSelected] = React.useState(-1);
    const templateService = new TemplateService();

    useEffect(() => {
        const fetchDataFromAPI = async () => {
            const allTemplates = await templateService.getAllTemplates();
            setTemplates(allTemplates);
        };
        fetchDataFromAPI();
    }, []);

    return (
        <Container>
            <Form>
                <Form.Group required className="mb-3">
                    <InputGroup>
                        <InputGroup.Text id="btnGroupAddon2">Show</InputGroup.Text>
                        <Form.Select
                            onChange={(e) => {
                                setSelected(-1);
                            }}
                        >
                            <option value="User">Your Templates</option>
                            <option value="Public">Public Templates</option>
                        </Form.Select>
                    </InputGroup>
                </Form.Group>
            </Form>

            <Row xs={1} md={2} className="g-4">
                {templates.map((template, index) => {
                    return (
                        <>
                            <Col key={index}>
                                <Card
                                    className={
                                        selected === index ? "template-card active" : "template-card"
                                    }
                                    onClick={() => {
                                        props.setImage(template.url);
                                        setSelected(index);
                                    }}
                                >
                                    <Card.Body>
                                        <Card.Title>Template {index + 1}</Card.Title>
                                    </Card.Body>
                                    <Card.Img variant="top" src={template.url} style={{ display: "block", margin: "auto"}}/>
                                </Card>
                            </Col>
                            <Col>
                                <Card className="template-stats" width="100%">
                                    <Card.Body>
                                        <Card.Title>Template {index + 1} Statistics</Card.Title>
                                        <TemplateStatistics template={template}/>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </>
                    );
                })}
            </Row>
        </Container>
    );
}
    export default AddTemplates;
