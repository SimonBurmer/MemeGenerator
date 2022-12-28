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
    console.log("hier")
    console.log(props.text)
    saveAs(props.image, 'meme.jpg') // Put your image url here.
  }

  function ComponentDidMount() {
    console.log("jsadkjkhdasdfjhk")

    //const img = createImageBitmap(props.image)

    //console.log(typeof props.image)
    //console.log(typeof img)
    const test = new Image(props.image)
    //console.log(typeof test)

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');


    //const img = URL.createObjectURL(props.image);

    ctx.fillStyle = "green";
    ctx.font = "50px serif";
    ctx.fillText("Hello world", 0, 100);
    //ctx.fillRect(0, 0, 100, 100);


    ctx.drawImage(test, 0, 100)

    const dataURL = canvas.toDataURL()
    saveAs(dataURL, 'meme.jpg')

  }

  return (
    <Container className="image-options-container">

      <Row className="image-options-row" onClick={() => setModalUploadImageShow(true)}>
        <Col className="d-flex justify-content-start">
          Show Meme
        </Col>
        <Col className="d-flex justify-content-end align-items-center">
          Icon
        </Col>
      </Row>
      <Row className="image-options-row" onClick={ComponentDidMount}>
        <Col className="d-flex justify-content-start">
          Download Meme
        </Col>
        <Col className="d-flex justify-content-end align-items-center">
          Icon
        </Col>
      </Row>

      <ModalUploadImage
        show={modalUploadImageShow}
        onHide={() => setModalUploadImageShow(false)}
        image={props.image}
      />

      <canvas ref={canvasRef} />

    </Container>
  );
}

export default GenerateImageTab;