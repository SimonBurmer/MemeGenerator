import React from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {
  AiFillAppstore,
  AiOutlineCamera,
  AiOutlineGif,
  AiOutlineVideoCamera,
  AiOutlineLink,
  AiOutlineEdit,
  AiOutlineUpload
} from "react-icons/ai";

var imageOptions = [
  ["Choose template", <AiFillAppstore />],
  ["Upload image", <AiOutlineUpload />],
  ["Take a photo", <AiOutlineCamera />],
  ["Upload gif (as image)", <AiOutlineGif />],
  ["Upload video (as image)", <AiOutlineVideoCamera />],
  ["Enter an image url", <AiOutlineLink />],
  ["Create your own", <AiOutlineEdit />],
];

function EditorImageOptionsTab() {
  return (
    <Container className="image-options-container">
    {
      imageOptions.map(element => {
                        return <Row key={element} className="image-options-row">
                        <Col xs={8} className="d-flex justify-content-start">
                            {element[0]}
                        </Col>
                        <Col className="d-flex justify-content-end align-items-center">
                            {element[1]}
                        </Col>
                      </Row>
      })
    }
    </Container>
  );
}

export default EditorImageOptionsTab;