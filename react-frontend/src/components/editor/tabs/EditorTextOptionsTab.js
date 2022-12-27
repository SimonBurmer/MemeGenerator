import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Dropdown from 'react-bootstrap/Dropdown';
import React from "react";

var sizeStart = 10;
var sizeEnd = 64;
var sizes = Array(sizeEnd).fill().map(() => sizeStart++);

const CSS_COLOR_NAMES = [
    "AliceBlue",
    "AntiqueWhite",
    "Aqua",
    "Aquamarine",
    "Azure",
    "Beige",
    "Bisque",
    "Black",
    "BlanchedAlmond",
    "Blue",
    "BlueViolet",
    "Brown",
    "BurlyWood",
    "CadetBlue",
    "Chartreuse",
    "Chocolate",
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
    "DarkGreen",
    "DarkKhaki",
    "DarkMagenta",
    "DarkOliveGreen",
    "DarkOrange",
    "DarkOrchid",
    "DarkRed",
    "DarkSalmon",
    "DarkSeaGreen",
    "DarkSlateBlue",
    "DarkSlateGray",
    "DarkSlateGrey",
    "DarkTurquoise",
    "DarkViolet",
    "DeepPink",
    "DeepSkyBlue",
    "DimGray",
    "DimGrey",
    "DodgerBlue",
    "FireBrick",
    "FloralWhite",
    "ForestGreen",
    "Fuchsia",
    "Gainsboro",
    "GhostWhite",
    "Gold",
    "GoldenRod",
    "Gray",
    "Grey",
    "Green",
    "GreenYellow",
    "HoneyDew",
    "HotPink",
    "IndianRed",
    "Indigo",
    "Ivory",
    "Khaki",
    "Lavender",
    "LavenderBlush",
    "LawnGreen",
    "LemonChiffon",
    "LightBlue",
    "LightCoral",
    "LightCyan",
    "LightGoldenRodYellow",
    "LightGray",
    "LightGrey",
    "LightGreen",
    "LightPink",
    "LightSalmon",
    "LightSeaGreen",
    "LightSkyBlue",
    "LightSlateGray",
    "LightSlateGrey",
    "LightSteelBlue",
    "LightYellow",
    "Lime",
    "LimeGreen",
    "Linen",
    "Magenta",
    "Maroon",
    "MediumAquaMarine",
    "MediumBlue",
    "MediumOrchid",
    "MediumPurple",
    "MediumSeaGreen",
    "MediumSlateBlue",
    "MediumSpringGreen",
    "MediumTurquoise",
    "MediumVioletRed",
    "MidnightBlue",
    "MintCream",
    "MistyRose",
    "Moccasin",
    "NavajoWhite",
    "Navy",
    "OldLace",
    "Olive",
    "OliveDrab",
    "Orange",
    "OrangeRed",
    "Orchid",
    "PaleGoldenRod",
    "PaleGreen",
    "PaleTurquoise",
    "PaleVioletRed",
    "PapayaWhip",
    "PeachPuff",
    "Peru",
    "Pink",
    "Plum",
    "PowderBlue",
    "Purple",
    "RebeccaPurple",
    "Red",
    "RosyBrown",
    "RoyalBlue",
    "SaddleBrown",
    "Salmon",
    "SandyBrown",
    "SeaGreen",
    "SeaShell",
    "Sienna",
    "Silver",
    "SkyBlue",
    "SlateBlue",
    "SlateGray",
    "SlateGrey",
    "Snow",
    "SpringGreen",
    "SteelBlue",
    "Tan",
    "Teal",
    "Thistle",
    "Tomato",
    "Turquoise",
    "Violet",
    "Wheat",
    "White",
    "WhiteSmoke",
    "Yellow",
    "YellowGreen",
  ];

const FONT_FAMILIES = 
[
  "Arial",
  "Roboto"
]

function EditorTextOptionsTab(props) {

  const [fontSize, setFontSize] = React.useState(12);
  const [textColor, setTextColor] = React.useState("Black");
  const [backgroundColor, setBackgroundColor] = React.useState("White");
  const [fontFamily, setFontFamily] = React.useState("Arial");
  const [text, setText] = React.useState(null);
  const [x, setX] = React.useState(0);
  const [y, setY] = React.useState(0);

  const [validated, setValidated] = React.useState(false);

  function HandleAddTextBlock()
  {
      if (text === null || text === "")
      {
        setValidated(false);
        return;
      }
      setValidated(true);
      props.addTextBlock(text, x, y, fontSize, fontFamily, textColor, backgroundColor);
  }

  return (
    <Form noValidate validated={validated}>
      <Form.Group className="mb-3">
        <Form.Label>Text</Form.Label>
        <Form.Control value={text} onChange={evt => setText(evt.target.value)} required placeholder="text" />
      </Form.Group>

      <Form.Group noValidate className="mb-3">
        <Row>
            <Col>
            <Form.Label>X</Form.Label>
        <Form.Control value={x} onChange={evt => setX(evt.target.value)} type="number" placeholder="0" />
        <Form.Text>
            Range -255, 255
        </Form.Text>
            </Col>
            <Col>
            <Form.Label>Y</Form.Label>
        <Form.Control value={y} onChange={evt => setY(evt.target.value)} type="number" placeholder="0" />
        <Form.Text>
            Range -255, 255
        </Form.Text>
            </Col>
        </Row>
      </Form.Group>

        <Row>
            <Col>
            <Dropdown>
      <Dropdown.Toggle variant="light" id="fontsize-dropdown">
        font size: {fontSize}
      </Dropdown.Toggle>

      <Dropdown.Menu>
      {
          sizes.map(element => {
                return <Dropdown.Item onClick={(e) => setFontSize(e.target.textContent)} key={element}>{element}</Dropdown.Item>
          })
        }
      </Dropdown.Menu>
    </Dropdown>
            </Col>
        <Col>
        <Dropdown>
      <Dropdown.Toggle variant="light" id="dropdown-basic">
        text color: {textColor}
      </Dropdown.Toggle>

      <Dropdown.Menu>
        {
            CSS_COLOR_NAMES.map(element => {
                            return <Dropdown.Item onClick={(e) => setTextColor(e.target.textContent)} key={element}>{element}</Dropdown.Item>
            })
        }
      </Dropdown.Menu>
    </Dropdown>
        </Col>
        </Row>

        <Row>
            <Col>
            <Dropdown>
      <Dropdown.Toggle variant="light" id="dropdown-basic">
        font: {fontFamily}
      </Dropdown.Toggle>

      <Dropdown.Menu>
        {
      FONT_FAMILIES.map(element => {
                            return <Dropdown.Item onClick={(e) => setFontFamily(e.target.textContent)} key={element}>{element}</Dropdown.Item>
            })
          }
      </Dropdown.Menu>
    </Dropdown>
            </Col>
        <Col>
        <Dropdown>
      <Dropdown.Toggle variant="light" id="dropdown-basic">
        background color: {backgroundColor}
      </Dropdown.Toggle>

      <Dropdown.Menu>
      {
            CSS_COLOR_NAMES.map(element => {
                            return <Dropdown.Item onClick={(e) => setBackgroundColor(e.target.textContent)} key={element}>{element}</Dropdown.Item>
            })
        }
      </Dropdown.Menu>
    </Dropdown>
        </Col>
        </Row>

      <Button variant="primary" onClick={HandleAddTextBlock}>
        Hinzufügen
      </Button>
    </Form>
    );
}

export default EditorTextOptionsTab;