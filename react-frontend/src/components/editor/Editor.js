import React, { useRef, useState } from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import './Editor.css';
import EditorTextOptionsTab from './tabs/EditorTextOptionsTab';
import EditorImageOptionsTab from './tabs/EditorImageOptionsTab';
import GenerateImageTab from './tabs/GenerateImageTab';
import MemeEditorComponent from './components/MemeEditorComponent';

function Editor() {
  const memeEditor = useRef(null);
  const [textBlocks, setTextBlocks] = useState([]);
  const [image, setImage] = useState("");
  let key = 1;

  function addTextBlock (text, x, y, fontSize, fontFamily, textColor, backgroundColor)
  {
    let newTextBlocks = textBlocks.slice();
    newTextBlocks.push({hasChanges: false, key: key, text: text, x: x, y: y, fontSize: fontSize, fontFamily: fontFamily, textColor: textColor, backgroundColor: backgroundColor});
    setTextBlocks(newTextBlocks);
    key = key + 1;    
  }

  function updateTextBlocks()
  {
    let newTextBlocks = textBlocks.slice();
    setTextBlocks(newTextBlocks);
  }

  function addImage(image) {
    setImage(image)
  }

  return (
    <Container className="editor-layout-container">
      <Row className="justify-content-md-center">
      <Col xs={10} md={7} className="editor-layout-col editor-view-container border border-secondary">
      <MemeEditorComponent ref={memeEditor} textBlocks={textBlocks} image={image}/>
        </Col>
      <Col className="editor-layout-col editor-options-container border border-secondary" style={{    overflow: "overlay"}}>
          <Tabs
            defaultActiveKey="home"
            id="uncontrolled-tab-example"
            className="mb-3"
          >
            <Tab eventKey="home" title="Image">
              <EditorImageOptionsTab addImage={addImage} />
            </Tab>
            <Tab eventKey="profile" title="Text">
              <EditorTextOptionsTab updateTextBlocks={updateTextBlocks} addTextBlock={addTextBlock} textBlocks={textBlocks}/>
            </Tab>
            <Tab eventKey="generate" title="Generate">
              <GenerateImageTab image={image} text={memeEditor}/>
            </Tab>
          </Tabs>
        </Col>
      </Row>
    </Container>
  );
}

export default Editor;