import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import React from "react";
import Modal from 'react-bootstrap/Modal';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/esm/Button';
import { saveAs } from 'file-saver';
import { useRef } from "react";
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
      <img src={props.canvas} style={{ width: 'auto', height: 'auto' }} />
    </Modal>
  );
}

function GenerateImageTab(props) {
  const canvasRef = useRef(null)
  const [modalUploadImageShow, setModalUploadImageShow] = React.useState(false);

  function downloadMeme() {
    console.log("hier")
    console.log(props.text)
    saveAs(props.images, 'meme.jpg') // Put your image url here.
  }

  function saveMemeLocal() {
    saveAs(props.canvas, 'meme.jpg')
  }

  function saveMemeOnServer() {
    saveAs(props.canvas, 'meme.jpg')
  }

  return (
    <Container className="image-options-container">
        <Row className="image-options-row" onClick={() => setModalUploadImageShow(true)}>
        <Col className="d-flex justify-content-start">
          Show Meme
        </Col>
        <Col className="d-flex justify-content-end align-items-center">
          <BsCardImage />
        </Col>
      </Row>

      <div style={{ backgroundColor: "lightgrey", height: "1px", margin: "10px" }}></div>

      <Form>
      <Form.Group required className="mb-3">
        <Form.Label>Text</Form.Label>
        <Form.Control placeholder="Meme Name" />
      </Form.Group>
      </Form>

      <Row className="image-options-row" onClick={saveMemeLocal}>
        <Col className="d-flex justify-content-start">
          Save Meme on Server
        </Col>
        <Col className="d-flex justify-content-end align-items-center">
          <BsCloudArrowUp />
        </Col>
      </Row>

      <div style={{ backgroundColor: "lightgrey", height: "1px", margin: "10px" }}></div>

      <Row className="image-options-row" onClick={saveMemeLocal}>
        <Col className="d-flex justify-content-start">
          Download Meme
        </Col>
        <Col className="d-flex justify-content-end align-items-center">
          <BsCloudArrowDown />
        </Col>
      </Row>

      <ModalUploadImage
        show={modalUploadImageShow}
        onHide={() => setModalUploadImageShow(false)}
        canvas={props.canvas}
      />

    </Container>
  );
}

export default GenerateImageTab;