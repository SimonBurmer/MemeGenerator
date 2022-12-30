import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Dropdown from 'react-bootstrap/Dropdown';
import React from "react";
import { useState, useEffect} from "react";
import Container from 'react-bootstrap/esm/Container';
import TextBlock from '../models/TextBlock'

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

  const [textBlock, setTextBlock] = useState(new TextBlock());
  const [textBlocks, setTextBlocks] = useState(props.textBlocks);
  const [selected, setSelected] = useState(-1);

  useEffect(() => 
  { 
    setTextBlocks(props.textBlocks) 
  }, [props.textBlocks]);

  function HandleAddTextBlock()
  {
      if (textBlock.text === null || textBlock.text === "")
      {
        alert("Text einfügen");
        return;
      }

      props.addTextBlock(textBlock);
      Clear();
  }

  function Clear()
  {
    setSelected(-1);
    setTextBlock(new TextBlock());
  }

  function SelectTextBlock(index)
  {
    setSelected(index);
    let block = textBlocks[index];
    if (block == null)
    {
      return;
    }

    setTextBlock(block);
  }

  function UpdateTextBlock(setFunc)
  {
    setFunc();
    props.updateTextBlocks();      
  }

  return (
    <Container>
    <Form>
      <Form.Group required className="mb-3">
        <Form.Label>Text</Form.Label>
        <Form.Control value={textBlock.text} onChange={evt => UpdateTextBlock(() => textBlock.text = evt.target.value)} required placeholder="text" />
      </Form.Group>

      <Form.Group className="mb-3">
        <Row>
            <Col>
            <Form.Label>X</Form.Label>
        <Form.Control value={textBlock.x} onChange={evt => UpdateTextBlock(() => textBlock.x = evt.target.value)} type="number" placeholder="0" />
        <Form.Text>
            Range: 0 - 100%
        </Form.Text>
            </Col>
            <Col>
            <Form.Label>Y</Form.Label>
        <Form.Control value={textBlock.y} onChange={evt => UpdateTextBlock(() => textBlock.y = evt.target.value)} type="number" placeholder="0" />
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
        font size: {textBlock.fontSize}
      </Dropdown.Toggle>

      <Dropdown.Menu>
      {
          sizes.map(element => {
                return <Dropdown.Item onClick={e => UpdateTextBlock(() => textBlock.fontSize = e.target.textContent)} key={element}>{element}</Dropdown.Item>
          })
        }
      </Dropdown.Menu>
    </Dropdown>
            </Col>
        <Col>
        <Dropdown>
      <Dropdown.Toggle variant="light" id="dropdown-basic">
        text color: {textBlock.textColor}
      </Dropdown.Toggle>

      <Dropdown.Menu>
        {
            CSS_COLOR_NAMES.map(element => {
                            return <Dropdown.Item onClick={e => UpdateTextBlock(() => textBlock.textColor = e.target.textContent)} key={element}>{element}</Dropdown.Item>
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
        font: {textBlock.fontFamily}
      </Dropdown.Toggle>

      <Dropdown.Menu>
        {
      FONT_FAMILIES.map(element => {
                            return <Dropdown.Item onClick={e=> UpdateTextBlock(() => textBlock.fontFamily = e.target.textContent)} key={element}>{element}</Dropdown.Item>
            })
          }
      </Dropdown.Menu>
    </Dropdown>
            </Col>
        <Col>
        <Dropdown>
      <Dropdown.Toggle variant="light" id="dropdown-basic">
        background color: {textBlock.backgroundColor}
      </Dropdown.Toggle>

      <Dropdown.Menu>
      {
            CSS_COLOR_NAMES.map(element => {
                            return <Dropdown.Item onClick={e => UpdateTextBlock(() => textBlock.backgroundColor = e.target.textContent)} key={element}>{element}</Dropdown.Item>
            })
        }
      </Dropdown.Menu>
    </Dropdown>
        </Col>
        </Row>
        <Row className="justify-content-md-end">
        <Col xs lg="5">
          <Button style={{width: "100%"}} variant="primary" onClick={Clear}>
          Clear
        </Button>
          </Col>
          <Col xs lg="5">
          <Button style={{width: "100%"}} disabled={selected !== -1 || (textBlock.text === null || textBlock.text === "")} variant="primary" onClick={HandleAddTextBlock}>
          Hinzufügen
        </Button>
          </Col>
        </Row>
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