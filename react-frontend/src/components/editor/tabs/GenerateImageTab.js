import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import React from "react";
import Modal from 'react-bootstrap/Modal';
import { Form, Button } from 'react-bootstrap';
import { saveAs } from 'file-saver';
import { useRef } from "react";
import Dropdown from 'react-bootstrap/Dropdown';
import Resizer from "react-image-file-resizer";
import GeneratedMeme from '../models/GeneratedMeme'

import {
  BsCloudArrowDown,
  BsCloudArrowUp,
  BsCardImage,
} from "react-icons/bs";


function ModalUploadImage(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <img src={props.canvasImage} style={{ width: 'auto', height: 'auto' }} />
    </Modal>
  );
}

function GenerateImageTab(props) {
  const [modalUploadImageShow, setModalUploadImageShow] = React.useState(false);
  const [fileName, setFileName] = React.useState('MyMeme');
  const [fileWidth, setFileWidth] = React.useState(500);
  //const [fileHeight, setFileHeight] = React.useState(500);
  const [fileFormat, setFileFormat] = React.useState('JPEG');
  const [fileQuality, setFileQuality] = React.useState(100);
  const [memeTitle, setMemeTitle] = React.useState('');
  const [memeDescription, setMemeDescription] = React.useState('');


  function setFileQualityAndCheck(value){
    setFileQuality(value)
    if (value > 100){
      setFileQuality(100)
    }
    if (value < 1){
      setFileQuality(1)
    }
  }


  const resizeFile = (file) =>
    new Promise((resolve) => {
      Resizer.imageFileResizer(
        file,
        fileWidth,
        fileWidth,
        "JPEG",
        fileQuality,
        0,
        (uri) => {
          resolve(uri);
        },
        "base64"
      );
    });

  async function saveMemeLocal(event) {
    event.preventDefault();
    const imageUrl = props.canvasImage
    const imageBlob = await fetch(imageUrl).then(r => r.blob());

    const der = await resizeFile(imageBlob);

    saveAs(der, fileName + "." + fileFormat)
  }

  function saveMemeOnServer() {
    const generatedMeme = new GeneratedMeme(memeTitle, memeDescription, props.canvasImage)
  }

  return (
    <Container className="image-options-container">
      <Row className="">
        <Button onClick={() => setModalUploadImageShow(true)}>Show Generated Meme</Button>
      </Row>

      <div style={{ backgroundColor: "lightgrey", height: "1px", margin: "10px" }}></div>

      <Form onSubmit={saveMemeOnServer}>
        <Form.Group required className="mb-3">
          <Form.Label>Meme Title</Form.Label>
          <Form.Control
            name="File Name"
            type="text"
            placeholder="Meme Title"
            value={memeTitle}
            onChange={(event) => setMemeTitle(event.target.value)}
          />
        </Form.Group>

        <Form.Group required className="mb-3">
          <Form.Label>Meme Description</Form.Label>
          <Form.Control
            name="Description"
            type="text"
            placeholder="Meme Description"
            value={memeDescription}
            onChange={(event) => setMemeDescription(event.target.value)}
          />
        </Form.Group>

        <Row>
          <Col>
            <Button type="submit">Sava Meme as Template</Button>
          </Col>
          <Col>
            <Button type="submit">Publish Meme</Button>
          </Col>

        </Row>
      </Form>



      <div style={{ backgroundColor: "lightgrey", height: "1px", margin: "10px" }}></div>


      <Form onSubmit={saveMemeLocal}>
        <Form.Group required className="mb-3">
          <Form.Label>File Name</Form.Label>
          <Form.Control
            name="File Name"
            type="text"
            placeholder="Enter some text"
            value={fileName}
            onChange={(event) => setFileName(event.target.value)}
          />
        </Form.Group>

        <Form.Group required className="mb-3">
          <Row>
            <Col>
              <Form.Label>Height</Form.Label>
              <Form.Control
                name="Height"
                type="number"
                placeholder="0"
                value={fileWidth}
                onChange={(event) => setFileWidth(event.target.value)}
              />
            </Col>
            <Col>
              <Form.Label>Width</Form.Label>
              <Form.Control
                name="Width"
                type="number"
                placeholder="0"
                value={fileWidth}
                onChange={(event) => setFileWidth(event.target.value)}
              />
            </Col>

            <Col>
              <Form.Label>Quality</Form.Label>
              <Form.Control
                name="Width"
                type="number"
                placeholder="0"
                value={fileQuality}
                onChange={(event) => setFileQualityAndCheck(event.target.value)}
              />
            </Col>
            <Col>
              <Form.Label>Format</Form.Label>
              <Dropdown>
                <Dropdown.Toggle variant="light" id="dropdown-basic">
                  {fileFormat}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item onClick={e => setFileFormat("PNG")}>PNG</Dropdown.Item>
                  <Dropdown.Item onClick={e => setFileFormat("JPEG")}>JPEG</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Col>
          </Row>
        </Form.Group>

        <Button type="submit">Download Meme</Button>
      </Form>



      <ModalUploadImage
        show={modalUploadImageShow}
        onHide={() => setModalUploadImageShow(false)}
        canvasImage={props.canvasImage}
      />

    </Container>
  );
}

export default GenerateImageTab;