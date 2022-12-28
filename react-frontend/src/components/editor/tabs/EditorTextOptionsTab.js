import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Dropdown from 'react-bootstrap/Dropdown';
import React from "react";
import Container from 'react-bootstrap/esm/Container';

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
  const [text, setText] = React.useState("");
  const [x, setX] = React.useState(0);
  const [y, setY] = React.useState(0);
  const [textBlocks, setTextBlocks] = React.useState(props.textBlocks);
  const [selected, setSelected] = React.useState(-1);

  React.useEffect(() => { setTextBlocks(props.textBlocks) }, [props.textBlocks]);

  function HandleAddTextBlock()
  {
      if (text === null || text === "")
      {
        alert("Text einfügen");
        return;
      }

      props.addTextBlock(text, x, y, fontSize, fontFamily, textColor, backgroundColor);
      SelectTextBlock(textBlocks.length);
  }

  function SelectTextBlock(index)
  {
    setSelected(index);
    let block = textBlocks[index];
    if (block == null)
    {
      return;
    }

    setText(block.text);
    setX(block.x);
    setY(block.y);
    setFontSize(block.fontSize);
    setFontFamily(block.fontFamily);
    setTextColor(block.textColor);
    setBackgroundColor(block.backgroundColor);
  }

  function UpdateTextBlock(setFunc, val, property)
  {
    setFunc(val);

    if(selected < 0)
    {
      return;
    }
    let block = textBlocks[selected];
    block.hasChanges = true;

    switch(property)
    {
      case "text":
        block.text = val;
        break;
        case "x":
          block.x = val;
          break;
          case "y":
            block.y = val;
            break;
            case "fontSize":
              block.fontSize = val;
              break;
              case "fontFamily":
                block.fontFamily = val;
                break;
                case "textColor":
                  block.textColor = val;
                  break;
                  case "backgroundColor":
                    block.backgroundColor = val;
                    break;
      default:
        break;
    }
    
    props.updateTextBlocks();
  }

  return (
    <Container>
    <Form>
      <Form.Group required className="mb-3">
        <Form.Label>Text</Form.Label>
        <Form.Control value={text} onChange={evt => UpdateTextBlock(setText, evt.target.value, "text")} required placeholder="text" />
      </Form.Group>

      <Form.Group className="mb-3">
        <Row>
            <Col>
            <Form.Label>X</Form.Label>
        <Form.Control value={x} onChange={evt => UpdateTextBlock(setX, evt.target.value, "x")} type="number" placeholder="0" />
        <Form.Text>
            Range: 0 - 100%
        </Form.Text>
            </Col>
            <Col>
            <Form.Label>Y</Form.Label>
        <Form.Control value={y} onChange={evt => UpdateTextBlock(setY, evt.target.value, "y")} type="number" placeholder="0" />
        <Form.Text>
        Range: 0 - 100%
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
                return <Dropdown.Item onClick={e => UpdateTextBlock(setFontSize, e.target.textContent, "fontSize")} key={element}>{element}</Dropdown.Item>
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
                            return <Dropdown.Item onClick={e => UpdateTextBlock(setTextColor, e.target.textContent, "textColor")} key={element}>{element}</Dropdown.Item>
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
                            return <Dropdown.Item onClick={e=> UpdateTextBlock(setFontFamily, e.target.textContent, "fontFamily")} key={element}>{element}</Dropdown.Item>
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
                            return <Dropdown.Item onClick={e => UpdateTextBlock(setBackgroundColor, e.target.textContent, "backgroundColor")} key={element}>{element}</Dropdown.Item>
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

    <div style={{backgroundColor: "lightgrey", height: "1px", margin: "10px"}}></div>
    
    <Container>
      <h6>Erstellte Textblöcke:</h6>
    {
            textBlocks.map((element, index) => {
              return <Row key={index} onClick={(e) => SelectTextBlock(index)} className={selected === index ? "textbox-row active" : "textbox-row"}>{element.text}</Row>
          })
      }
    </Container>
    </Container>
    );
}

export default EditorTextOptionsTab;