import React, { useRef, useState } from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import './Editor.css';
import TextOptionsTab from './tabs/TextOptionsTab';
import ImageOptionsTab from './tabs/ImageOptionsTab';
import GenerateImageTab from './tabs/GenerateImageTab';
import PencelOptionsTab from './tabs/PencelOptionsTab';
import MemeEditorCanvas from './components/MemeEditorCanvas';
import ImageBlock from "./models/ImageBlock";


function Editor() {
  const [textBlocks, setTextBlocks] = useState([]);
  const [images, setImages] = useState([]);
  const [canvasImage, setCanvasImage] = useState(null);
  const [pencilAttributes, setPencilAttributes] = useState({'lineWidth': 5, 'strokeStyle': 'red'});

  function addTextBlock (textBlock)
  {
    let newTextBlocks = textBlocks.slice();
    newTextBlocks.unshift(textBlock);
    setTextBlocks(newTextBlocks);
  }

  function updateTextBlocks()
  {
    let newTextBlocks = textBlocks.slice();
    setTextBlocks(newTextBlocks);
  }

  function updateImages()
  {
    let newImages = images.slice();
    setImages(newImages);
  }

  function addImage(src) {
    let newImages = images.slice();
    let newImage = new ImageBlock();
    newImage.src = src;
    newImages.unshift(newImage);
    setImages(newImages);
  }

  return (
    <Container className="editor-layout-container">
      <Row className="justify-content-between">
      <Col md={10} lg={5}  className="editor-layout-col align-end text-align-end fit-content">
          <MemeEditorCanvas setCanvasImage={setCanvasImage} textBlocks={textBlocks} images={images} pencil={pencilAttributes}/>
        </Col>
      <Col md={10} lg={5} className="editor-layout-col editor-options-container border border-secondary" style={{overflow: "overlay"}}>
          <Tabs
            defaultActiveKey="home"
            id="uncontrolled-tab-example"
            className="mb-3"
          >
            <Tab eventKey="home" title="Image">
              <ImageOptionsTab addImage={addImage} images={images} updateImages={updateImages}/>
            </Tab>
            <Tab eventKey="profile" title="Text">
              <TextOptionsTab updateTextBlocks={updateTextBlocks} addTextBlock={addTextBlock} textBlocks={textBlocks}/>
            </Tab>
            <Tab eventKey="pencil" title="Pencil">
              <PencelOptionsTab  setPencilAttributes={setPencilAttributes}/>
            </Tab>
            <Tab eventKey="generate" title="Generate">
              <GenerateImageTab images={images} canvasImage={canvasImage} text={"test"}/>
            </Tab>
          </Tabs>
        </Col>
      </Row>
    </Container>
  );
}

export default Editor;