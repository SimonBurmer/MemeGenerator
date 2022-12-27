import React, { useRef } from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import './Editor.css';
import EditorTextOptionsTab from './tabs/EditorTextOptionsTab';
import EditorImageOptionsTab from './tabs/EditorImageOptionsTab';
import MemeEditorComponent from './components/MemeEditorComponent';

function Editor() {
  const memeEditor = useRef(null);

  function addTextBlock (text, x, y, fontSize, fontFamily, textColor, backgroundColor)
  {
    console.log("add Text: " + text);
    memeEditor.current.addTextBlock(text, x, y, fontSize, fontFamily, textColor, backgroundColor);     
  }

  return (
    <Container className="editor-layout-container">
      <Row className="justify-content-md-center">
      <Col xs={10} md={7} className="editor-layout-col editor-view-container border border-secondary">
      <MemeEditorComponent ref={memeEditor}/>
        </Col>
        <Col className="editor-layout-col editor-options-container border border-secondary">
          <Tabs
            defaultActiveKey="profile"
            id="uncontrolled-tab-example"
            className="mb-3"
          >
            <Tab eventKey="home" title="Image">
              <EditorImageOptionsTab />
            </Tab>
            <Tab eventKey="profile" title="Text">
              <EditorTextOptionsTab addTextBlock={addTextBlock}/>
            </Tab>
            <Tab eventKey="contact" title="Generate">

            </Tab>
          </Tabs>
        </Col>
      </Row>
    </Container>
    );
}

export default Editor;