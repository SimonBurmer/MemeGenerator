import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import React from "react";
import { Form, Button } from 'react-bootstrap';
import Dropdown from 'react-bootstrap/Dropdown';
import Toast from 'react-bootstrap/Toast';

const CSS_COLOR_NAMES = [
  "Red",
  "Blue",
  "Green",
  "AntiqueWhite",
  "Aqua",
  "BlanchedAlmond",
  "Coral",
  "CornflowerBlue",
  "Cornsilk",
  "Crimson",
  "Cyan",
  "DarkBlue",
  "DarkCyan",
  "DarkGoldenRod",
  "DarkGray",
  "DarkGrey",
  "DarkSlateBlue",
  "DarkSlateGray",
  "DarkSlateGrey",
  "DarkTurquoise",
  "DarkViolet",
  "DeepPink",
  "GoldenRod",
  "Gray",
  "Grey",
  "GreenYellow",
  "HoneyDew",
  "HotPink",
  "IndianRed",
  "Indigo",
  "Ivory",
  "Khaki",
  "Lavender",
  "LavenderBlush",
  "LightCoral",
  "LightCyan",
  "LightGoldenRodYellow",
  "LightGray",
  "LightGrey",
  "LightGreen",
  "LightPink",
  "LightSalmon",
  "MediumPurple",
  "MediumSeaGreen",
  "MediumSlateBlue",
  "MediumSpringGreen",
  "MediumTurquoise",
  "NavajoWhite",
  "Navy",
  "OldLace",
  "Olive",
  "OliveDrab",
  "Orange",
  "OrangeRed",
  "Wheat",
  "White",
  "WhiteSmoke",
  "Yellow",
  "YellowGreen",
];

function PencelOptionsTab(props) {
  const [strokeStyle, setStrokeStyle] = React.useState('red');
  const [lineWidth, setLineWidth] = React.useState(5);
  const [show, setShow] = React.useState(false);

  function changePencil(event) {
    event.preventDefault();
    props.setPencilAttributes({ 'lineWidth': lineWidth, 'strokeStyle': strokeStyle })
  }

  return (
    <Container className="image-options-container">

      <Form onSubmit={changePencil}>
        <Form.Group required className="mb-3">
          <Row>
            <Col>
              <Form.Label>Pencil Width</Form.Label>
              <Form.Control
                name="Width"
                type="number"
                placeholder="0"
                value={lineWidth}
                onChange={(event) => setLineWidth(event.target.value)}
              />
            </Col>
            <Col>
              <Form.Label>Pencil Color</Form.Label>
              <Dropdown>
                <Dropdown.Toggle variant="light" id="dropdown-basic">
                  {strokeStyle}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {
                    CSS_COLOR_NAMES.map(element => {
                      return <Dropdown.Item onClick={e => setStrokeStyle(e.target.textContent)}> {element} </Dropdown.Item>
                    })
                  }
                </Dropdown.Menu>
              </Dropdown>
            </Col>
          </Row>
        </Form.Group>

        <Button type="submit" onClick={() => setShow(true)}>Change Pencil</Button>
      </Form>

      <div style={{ backgroundColor: "lightgrey", height: "1px", margin: "10px" }}></div>

      <Toast onClose={() => setShow(false)} show={show} delay={1000} autohide>
          <Toast.Header>
            <strong className="me-auto">Pencil Changed!</strong>
          </Toast.Header>
        </Toast>

    </Container>
  );
}

export default PencelOptionsTab;