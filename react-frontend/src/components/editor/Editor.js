import React, { useRef } from "react";
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
import { useState } from "react";

function Editor() {
  const memeEditor = useRef(null);
  const [image, setImage] = useState("");

  function addTextBlock(text, x, y, fontSize, fontFamily, textColor, backgroundColor) {
    console.log("add Text: " + text);
    memeEditor.current.addTextBlock(text, x, y, fontSize, fontFamily, textColor, backgroundColor);
  }

  function addImage(image) {
    setImage(image)
  }

  return (
    <Container className="editor-layout-container">
      <Row className="justify-content-md-center">
        <Col xs={10} md={7} className="editor-layout-col editor-view-container border border-secondary">
          <MemeEditorComponent ref={memeEditor} image={image} />

        </Col>
        <Col className="editor-layout-col editor-options-container border border-secondary">
          <Tabs
            defaultActiveKey="home"
            id="uncontrolled-tab-example"
            className="mb-3"
          >
            <Tab eventKey="home" title="Image">
              <EditorImageOptionsTab addImage={addImage} />
            </Tab>
            <Tab eventKey="text" title="Text">
              <EditorTextOptionsTab addTextBlock={addTextBlock} />
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