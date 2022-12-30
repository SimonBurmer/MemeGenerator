import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import React from "react";
import {useState, useEffect} from "react";


import ModalUploadImage from './modals/ModalUploadImage';
import ModalURLImage from './modals/ModalURLImage';
import ModalAddImageOptions from './modals/ModalAddImageOptions';

import {
  AiFillAppstore,
  AiOutlineCamera,
  AiOutlineGif,
  AiOutlineVideoCamera,
  AiOutlineLink,
  AiOutlineEdit,
  AiOutlineUpload,
} from "react-icons/ai";
import ImageBlock from '../models/ImageBlock';

function EditorImageOptionsTab(props) {
  const [modalUploadImageShow, setModalUploadImageShow] = useState(false);
  const [modalURLImageShow, setModalURLImageShow] = useState(false);
  const [modalAddImageOptionsShow, setModalAddImageOptionsShow] = useState(false);
  const [images, setImages] = useState(props.images);
  const [image, setImage] = useState(new ImageBlock());
  const [selected, setSelected] = useState(-1);

  useEffect(() => 
  { 
    setImages(props.images) 
  }, [props.images]);

  var imageOptions = [
    ["Choose template", <AiFillAppstore />, () => setModalUploadImageShow(true)],
    ["Upload image", <AiOutlineUpload />, () => setModalUploadImageShow(true)],
    ["Take a photo", <AiOutlineCamera />, () => setModalUploadImageShow(true)],
    ["Upload gif (as image)", <AiOutlineGif />, () => setModalUploadImageShow(true)],
    ["Upload video (as image)", <AiOutlineVideoCamera />, () => setModalUploadImageShow(true)],
    ["Enter an image url", <AiOutlineLink />, () => setModalURLImageShow(true)],
    ["Create your own", <AiOutlineEdit />, () => setModalUploadImageShow(true)],
  ];

  function selectImage(index)
  {
    setSelected(index);
    let image = images[index];
    if (image == null)
    {
      return;
    }

    console.log(image)
    setImage(image);
  }

  function updateImage(setFunc)
  {
    setFunc();
    props.updateImages();      
  }


  function addImage(image) {
    props.addImage(image)
  }

  return (
    <Container className="image-options-container">
      <Row>
      <Col>
            <Form>
      <Form.Group required className="mb-3">
        <Form.Label>Source</Form.Label>
        <Form.Control value={image.src} onChange={evt => updateImage(() => image.src = evt.target.value)} required placeholder="text" />
      </Form.Group>

      <Form.Group className="mb-3">
        <Row >
            <Col>
            <Form.Label>X</Form.Label>
        <Form.Control value={image.x} onChange={evt => updateImage(() => image.x = evt.target.value)} type="number" placeholder="0" />
            </Col>
            <Col>
            <Form.Label>Y</Form.Label>
        <Form.Control value={image.y} onChange={evt => updateImage(() => image.y = evt.target.value)} type="number" placeholder="0" />
            </Col>
        </Row>
      </Form.Group>
      <Form.Group className="mb-3">
        <Row >
            <Col>
            <Form.Label>Width</Form.Label>
        <Form.Control value={image.size} onChange={evt => updateImage(() => image.size = evt.target.value)} type="number" placeholder="0" />
            </Col>
        </Row>
      </Form.Group>
</Form>
            </Col>
      </Row>
      <Row>
        <Col>
        </Col>
      </Row>
      <Row>
        <Col>
        <div style={{backgroundColor: "lightgrey", height: "1px", margin: "10px"}}></div>
        </Col>
      </Row>
      <Row>
        <Col>
        <Container>
          <Row>
            <Col xs lg="2">

            </Col>
            <Col xs lg="8">
            <h6>Images in Canvas:</h6>
            </Col>
            <Col xs lg="2">
            <Button onClick={(e) => setModalAddImageOptionsShow(true)}>
              Add
            </Button>
            </Col>
          </Row>
          <Row>
          {
            images.map((element, index) => {
              return <Row key={index} onClick={(e) => selectImage(index)} className={selected === index ? "textbox-row active" : "textbox-row"}>{element.src}</Row>
          })
      }
          </Row>
    </Container>
        </Col>
      </Row>

    <ModalAddImageOptions
        show={modalAddImageOptionsShow}
        addImage={addImage}
        onHide={() => setModalAddImageOptionsShow(false)}
      />

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