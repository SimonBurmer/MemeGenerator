import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import React from "react";
import {useState, useEffect} from "react";

import ModalAddImageOptions from './modals/ModalAddImageOptions';
import ImageBlock from '../models/ImageBlock';
import {
  AiFillDelete
} from "react-icons/ai";

function EditorImageOptionsTab(props) {
  const [modalAddImageOptionsShow, setModalAddImageOptionsShow] = useState(false);
  const [images, setImages] = useState(props.images);
  const [image, setImage] = useState(new ImageBlock());
  const [selected, setSelected] = useState(-1);

  useEffect(() => 
  { 
    setImages(props.images)
  }, [props.images]);

  function selectImage(index)
  {
    setSelected(index);
    let image = images[index];
    if (image == null)
    {
      return;
    }

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
        <Form.Label style={{border: "1px solid gray", padding: "10px", borderRadius: "5px", width: "100%", minHeight: "50px"}}>{image.src}</Form.Label>
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
            <Button onClick={(e) => setModalAddImageOptionsShow(true)}>
              Add Image to Canvas
            </Button>
            </Col>
          </Row>
          <Row>
          {
            images.map((element, index) => {
              return <Row key={index} onClick={(e) => selectImage(index)} className={selected === index ? "textbox-row active" : "textbox-row"}>
                <Col>{element.src}</Col>
                <Col>
                  <AiFillDelete onClick={() => props.removeImage(element)}/>
                </Col>
              </Row>
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

    </Container>
  );
}

export default EditorImageOptionsTab;