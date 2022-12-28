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
  AiOutlineDesktop,
  AiOutlineUpload,
  AiOutlineDownload
} from "react-icons/ai";


function ModalUploadImage(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <img src={props.image} style={{ width: "100%", height: "100%" }} />
    </Modal>
  );
}

function GenerateImageTab(props) {
  const canvasRef = useRef(null)
  const [modalUploadImageShow, setModalUploadImageShow] = React.useState(false);

  function downloadMeme() {
    saveAs(generateMeme(), 'meme.jpg') // Put your image url here.
  }

  function uploadMeme(){
    const meme = generateMeme()
    console.log("TODO")
  }

  function generateMeme() {
    console.log("Generate Meme")

    const myImage = new Image();
    myImage.src = props.image;

    if(canvasRef && canvasRef.current) {
      const canvas = canvasRef.current;
      canvas.width  = 800;
      canvas.height = 600;
      const ctx = canvas.getContext('2d');
  
      ctx.drawImage(myImage, 0, 0, 800, 600)
  
      ctx.fillStyle = "green";
      ctx.font = "40px serif";
      ctx.fillText("Hello world", 0, 50);
  
      const dataURL = canvas.toDataURL()
      return dataURL
    }
  }

  return (
    <Container className="image-options-container">

      <Row className="image-options-row" onClick={() => setModalUploadImageShow(true)}>
        <Col className="d-flex justify-content-start">
          Show Meme
        </Col>
        <Col className="d-flex justify-content-end align-items-center">
          <AiOutlineDesktop/>
        </Col>
      </Row>
      <Row className="image-options-row" onClick={downloadMeme}>
        <Col className="d-flex justify-content-start">
          Download Meme
        </Col>
        <Col className="d-flex justify-content-end align-items-center">
          <AiOutlineDownload/>
        </Col>
      </Row>
      <Row className="image-options-row" onClick={uploadMeme}>
        <Col className="d-flex justify-content-start">
          Upload to Server
        </Col>
        <Col className="d-flex justify-content-end align-items-center">
        <AiOutlineUpload/>
        </Col>
      </Row>

      <Row>
        <Col>
        <canvas  hidden ref={canvasRef}/>
        </Col>
      </Row>

      <ModalUploadImage
        show={modalUploadImageShow}
        onHide={() => setModalUploadImageShow(false)}
        image={generateMeme()}
      />
    </Container>
  );
}

export default GenerateImageTab;