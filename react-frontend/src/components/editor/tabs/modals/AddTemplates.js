import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import React from "react";
import { Form } from "react-bootstrap";
import InputGroup from "react-bootstrap/InputGroup";
import { useEffect, useCallback, useState } from "react";
import TemplateService from "../../../../services/templateService";

function AddTemplates(props) {
  const [previews, setPreviews] = React.useState([]);
  const [selected, setSelected] = React.useState(-1);
  const templateService = new TemplateService();

  useEffect(() => {
    const fetchDataFromAPI = async () => {
      let p = [];
      const allMemes = await templateService.getAllTemplates();
      for (let i = 0; i < allMemes.length; ++i) {
        p.push(allMemes[i].url);
      }
      setPreviews(p);
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
        {previews.map((element, index) => {
          return (
            <Col key={index}>
              <Card
                className={
                  selected === index ? "template-card active" : "template-card"
                }
                onClick={() => {
                  props.setImage(element);
                  setSelected(index);
                }}
              >
                <Card.Img variant="top" src={element} />
                <Card.Body>
                  <Card.Title>Template {index + 1}</Card.Title>
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </Row>
    </Container>
  );
}
export default AddTemplates;
