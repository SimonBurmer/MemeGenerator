import React from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import './Editor.css';
import ImageTextOptions from './ImageTextOptions';
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
]

function Editor() {
  return (
    <Container className="editor-layout-container">
      <Row className="justify-content-md-center">
        <Col xs={10} md={7} className="editor-layout-col editor-view-container border border-secondary">

        </Col>
        <Col className="editor-layout-col editor-options-container border border-secondary">
          <Tabs
            defaultActiveKey="profile"
            id="uncontrolled-tab-example"
            className="mb-3"
          >
            <Tab eventKey="home" title="Image">
              <Container className="image-options-container">
                {
                  imageOptions.map(element => {
                    console.log(element);
                    return <Row className="image-options-row">
                      <Col xs={8} className="d-flex justify-content-start">
                        {element[0]}
                      </Col>
                      <Col className="d-flex justify-content-end align-items-center">
                        {console.log(element[1])}
                        {element[1]}
                      </Col>
                    </Row>
                  })
                }
              </Container>
            </Tab>
            <Tab eventKey="profile" title="Text">
              <ImageTextOptions />
            </Tab>
            <Tab eventKey="contact" title="Generate">

            </Tab>
          </Tabs>
        </Col>
      </Row>
    </Container>
  );
}

export default Editor;