import React from "react";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/esm/Button';
import Container from 'react-bootstrap/Container';
import Dropdown from 'react-bootstrap/Dropdown';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import AddWebcamImage from "./AddWebcamImage";
import AddTemplates from "./AddTemplates";
import AddGIF from "./AddGIF";
import AddVideo from "./AddVideo";
import { useState } from "react";
import {
  AiFillAppstore,
  AiOutlineCamera,
  AiOutlineGif,
  AiOutlineVideoCamera,
  AiOutlineLink,
  AiOutlineUpload,
} from "react-icons/ai";



function ModalAddImageOptions(props) {
  const [selectedOptionIndex, setSelectedOptionIndex] = useState(0);
  const [src, setSrc] = useState("");

  const imageOptions = [
    [0, "Choose template", <AiFillAppstore />, () => { }],
    [1, "Upload image", <AiOutlineUpload />, () => { }],
    [2, "Take a photo", <AiOutlineCamera />, () => { }],
    [3, "Upload gif (as image)", <AiOutlineGif />, () => { }],
    [4, "Upload video (as image)", <AiOutlineVideoCamera />, () => { }],
    [5, "Enter an image url", <AiOutlineLink />, () => { }],
  ];

  function uploadImage() {
    props.addImage(src);
    props.onHide();
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
          Add Image Options
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container className="image-options-container">
          <Row>
            <Col className="add-image-modal-container">

              <Dropdown size="xxl">
                <Dropdown.Toggle variant="light" id="dropdown-basic">
                  <Row>
                    <Col>
                      {imageOptions[selectedOptionIndex][1]}
                    </Col>
                    <Col>
                      {imageOptions[selectedOptionIndex][2]}
                    </Col>
                  </Row>
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  {
                    imageOptions.map((element, index) => {
                      return <Dropdown.Item onClick={e => setSelectedOptionIndex(index)} key={index}>
                        <Row>
                          <Col>
                            {imageOptions[index][1]}
                          </Col>
                          <Col>
                            {imageOptions[index][2]}
                          </Col>
                        </Row>
                      </Dropdown.Item>
                    })
                  }
                </Dropdown.Menu>
              </Dropdown>
            </Col>
          </Row>
          <Row>
            <Col className="add-image-modal-container">
              {(() => {
                switch (selectedOptionIndex) {
                  case 0:
                    return <Container>
                      <AddTemplates setImage={setSrc}/>
                    </Container>
                  case 1:
                    return <Container>
                      <p>
                        Wähle eine Bilddatei von deinem PC aus.
                      </p>
                      <input type="file"  onChange={(e) => setSrc(URL.createObjectURL(e.target.files[0]))} className="mt-3" />
                    </Container>;
                  case 2:
                    return <Container>
                      <AddWebcamImage addImage={setSrc} />
                    </Container>;
                  case 3:
                    return <Container>
                      <AddGIF addImage={setSrc}/>
                    </Container>;
                  case 4:
                    return <Container>
                      <AddVideo addImage={setSrc}/>
                    </Container>
                  case 5:
                    return <Container>
                      <p>
                        Gib eine URL zu einer Bilddatei an.
                      </p>

                      <Form>
                        <InputGroup className="mb-3">
                          <InputGroup.Text>URL</InputGroup.Text>
                          <Form.Control value={src} onChange={evt => setSrc(evt.target.value)} />
                        </InputGroup>
                      </Form>

                    </Container>;
                  default:
                    break;
                }
              })()}
            </Col>
          </Row>

        </Container>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
        <Button onClick={uploadImage}>Add</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalAddImageOptions;