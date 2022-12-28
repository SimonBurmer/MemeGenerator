import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import React from "react";
import Modal from 'react-bootstrap/Modal';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';

import {
  AiFillAppstore,
  AiOutlineCamera,
  AiOutlineGif,
  AiOutlineVideoCamera,
  AiOutlineLink,
  AiOutlineEdit,
  AiOutlineUpload
} from "react-icons/ai";
import Button from 'react-bootstrap/esm/Button';


function ModalUploadImage(props) {
  function UploadImage(e) {
    props.addImage(URL.createObjectURL(e.target.files[0]));
  }

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Upload Image
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          Wähle eine Bilddatei von deinem PC aus.
        </p>
        <input type="file" onChange={UploadImage} className="mt-3" />
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}
function ModalURLImage(props) {
  const [url, setUrl] = React.useState(null);

  const fetchImage = async () => {

    const res = await fetch(url);
    const imageBlob = await res.blob();
    const imageObjectURL = URL.createObjectURL(imageBlob);
    props.addImage(imageObjectURL);
  };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Enter Image URL
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          Gib eine URL zu einer Bilddatei an.
        </p>

        <Form>
          <InputGroup className="mb-3">
            <InputGroup.Text>URL</InputGroup.Text>
            <Form.Control value={url} onChange={evt => setUrl(evt.target.value)} />
            <Button variant="danger" onClick={fetchImage}>
              Upload
            </Button>
          </InputGroup>
          </Form>


      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}


var imageOptions = [
  ["Choose template", <AiFillAppstore />],
  ["Upload image", <AiOutlineUpload />],
  ["Take a photo", <AiOutlineCamera />],
  ["Upload gif (as image)", <AiOutlineGif />],
  ["Upload video (as image)", <AiOutlineVideoCamera />],
  ["Enter an image url", <AiOutlineLink />],
  ["Create your own", <AiOutlineEdit />],
];

function EditorImageOptionsTab(props) {
  const [modalUploadImageShow, setModalUploadImageShow] = React.useState(false);
  const [modalURLImageShow, setModalURLImageShow] = React.useState(false);

  function addImage(image) {
    props.addImage(image)
  }

  return (
    <Container className="image-options-container">
      {
        imageOptions.map(element => {
          return <Row key={element} className="image-options-row" onClick={() => setModalUploadImageShow(true)}>
            <Col xs={8} className="d-flex justify-content-start">
              {element[0]}
            </Col>
            <Col className="d-flex justify-content-end align-items-center">
              {element[1]}
            </Col>
          </Row>
        })
      }

      <Row className="image-options-row" onClick={() => setModalURLImageShow(true)}>
        <Col xs={8} className="d-flex justify-content-start">
          Enter an image url
        </Col>
        <Col className="d-flex justify-content-end align-items-center">
          <AiFillAppstore />
        </Col>
      </Row>


      <ModalUploadImage
        show={modalUploadImageShow}
        onHide={() => setModalUploadImageShow(false)}
        addImage={addImage}
      />

      <ModalURLImage
        show={modalURLImageShow}
        onHide={() => setModalURLImageShow(false)}
        addImage={addImage}
      />

    </Container>
  );
}

export default EditorImageOptionsTab;