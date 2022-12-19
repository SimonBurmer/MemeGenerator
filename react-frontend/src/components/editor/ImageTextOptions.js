import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Dropdown from 'react-bootstrap/Dropdown';

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

function ImageTextOptions() {
  return (
    <Form>
      <Form.Group className="mb-3">
        <Form.Label>Text</Form.Label>
        <Form.Control placeholder="text" />
      </Form.Group>

      <Form.Group className="mb-3">
        <Row>
            <Col>
            <Form.Label>X</Form.Label>
        <Form.Control type="number" placeholder="0" />
        <Form.Text>
            Range -255, 255
        </Form.Text>
            </Col>
            <Col>
            <Form.Label>Y</Form.Label>
        <Form.Control type="number" placeholder="0" />
        <Form.Text>
            Range -255, 255
        </Form.Text>
            </Col>
        </Row>
      </Form.Group>

        <Row>
            <Col>
            <Dropdown>
      <Dropdown.Toggle variant="light" id="dropdown-basic">
        Size
      </Dropdown.Toggle>

      <Dropdown.Menu>
      {
            sizes.map(element => {
                console.log(element);
                            return <Dropdown.Item key={element}>{element}</Dropdown.Item>
            })
        }
      </Dropdown.Menu>
    </Dropdown>
            </Col>
        <Col>
        <Dropdown>
      <Dropdown.Toggle variant="light" id="dropdown-basic">
        Color
      </Dropdown.Toggle>

      <Dropdown.Menu>
        {
            CSS_COLOR_NAMES.map(element => {
                            return <Dropdown.Item key={element}>{element}</Dropdown.Item>
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
        Font
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
        <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
        <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
            </Col>
        <Col>
        <Dropdown>
      <Dropdown.Toggle variant="light" id="dropdown-basic">
        Background
      </Dropdown.Toggle>

      <Dropdown.Menu>
      {
            CSS_COLOR_NAMES.map(element => {
                            return <Dropdown.Item key={element}>{element}</Dropdown.Item>
            })
        }
      </Dropdown.Menu>
    </Dropdown>
        </Col>
        </Row>

      <Button variant="primary" type="submit">
        Hinzufügen
      </Button>
    </Form>
    );
}

export default ImageTextOptions;