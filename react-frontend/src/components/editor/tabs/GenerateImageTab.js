import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import React from "react";
import Modal from "react-bootstrap/Modal";
import { Form, Button } from "react-bootstrap";
import { saveAs } from "file-saver";
import { useRef, useEffect } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import Resizer from "react-image-file-resizer";
import GeneratedMeme from "../models/GeneratedMeme";
import TemplateService from "../../../services/templateService";
import MemeService from "../../../services/memeService";
import { useLoggedInStore } from "../../../app/store";
import jwt_decode from "jwt-decode";

import { BsCloudArrowDown, BsCloudArrowUp, BsCardImage } from "react-icons/bs";

function GenerateImageTab(props) {
  const [fileName, setFileName] = React.useState("MyMeme");
  const [fileWidth, setFileWidth] = React.useState(500);
  //const [fileHeight, setFileHeight] = React.useState(500);
  const [fileFormat, setFileFormat] = React.useState("JPEG");
  const [accessibility, setAccessibility] = React.useState("public");
  const [fileQuality, setFileQuality] = React.useState(100);
  const [memeTitle, setMemeTitle] = React.useState("");
  const [memeDescription, setMemeDescription] = React.useState("");
  const [canvasImage, setCanvasImage] = React.useState(props.canvasImage);
  const templateService = new TemplateService();
  const memeService = new MemeService();
  const isAuthenticated = useLoggedInStore((state) => state.loggedIn);


  useEffect(() => {
    setCanvasImage(props.canvasImage);
  }, [props.canvasImage]);

  useEffect(() => {
    console.log(props.modalUploadImageShow);
  }, [props.modalUploadImageShow]);

  function setFileQualityAndCheck(value) {
    setFileQuality(value);
    if (value > 100) {
      setFileQuality(100);
    }
    if (value < 1) {
      setFileQuality(1);
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
    const imageUrl = canvasImage;
    console.log(imageUrl);

    var der = null;
    switch(fileFormat)
    {
      case "GIF":
        der = await fetch(imageUrl).then((r) => r.blob());
        break;
      default:
        const imageBlob = await fetch(imageUrl).then((r) => r.blob());
        der = await resizeFile(imageBlob);
        break;
    }

    saveAs(der, fileName + "." + fileFormat);
  }

  function saveMemeOnServer() {
    const generatedMeme = new GeneratedMeme(
      memeTitle,
      memeDescription,
      canvasImage
    );
  }

  async function saveMemeAsTemplate(event) {
    event.preventDefault();
    console.log(event.nativeEvent.submitter.name);
    const publishType = event.nativeEvent.submitter.name;
    const imageUrl = canvasImage;
    const imageBlob = await fetch(imageUrl).then((r) => r.blob());
    let formData = new FormData();
    formData.append("file", imageBlob, "image.png");

    if (publishType === "templateButton") {
      const responseTemplate = await templateService.uploadTemplate(formData);
      console.log(responseTemplate);
    }
    if (publishType === "memeButton") {
      console.log(isAuthenticated);
      if (isAuthenticated) {
        let userData = localStorage.getItem("loginData");
        let obj = JSON.parse(userData);
        var decodedJwt = jwt_decode(obj.jwtoken);
        const responseMeme = await memeService.publishMeme(
          formData,
          memeTitle,
          decodedJwt.id,
          accessibility,
          props.images,
          props.textBlocks,
          500,
          500
        );
      }
    }
    //const der = await resizeFile(imageBlob);
  }

  return (
    <Container className="image-options-container">
      <Row className="">
        <Button onClick={() => {props.updateCanvas(); }}>
          Show Generated Meme
        </Button>
      </Row>

      <div
        style={{ backgroundColor: "lightgrey", height: "1px", margin: "10px" }}
      ></div>

      <Form onSubmit={saveMemeAsTemplate}>
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
          <Form.Label>accessibility</Form.Label>
          <Dropdown>
            <Dropdown.Toggle variant="light" id="dropdown-acc">
              {accessibility}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={(e) => setAccessibility("public")}>
                public
              </Dropdown.Item>
              <Dropdown.Item onClick={(e) => setAccessibility("private")}>
                private
              </Dropdown.Item>
              <Dropdown.Item onClick={(e) => setAccessibility("unlisted")}>
                unlisted
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Form.Group>

        <Row>
          <Col>
            <Button name="templateButton" type="submit">
              Save Meme as Template
            </Button>
          </Col>
          <Col>
            <Button name="memeButton" type="submit">
              Publish Meme
            </Button>
          </Col>
        </Row>
      </Form>

      <div
        style={{ backgroundColor: "lightgrey", height: "1px", margin: "10px" }}
      ></div>

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
                  <Dropdown.Item onClick={(e) => setFileFormat("PNG")}>
                    PNG
                  </Dropdown.Item>
                  <Dropdown.Item onClick={(e) => setFileFormat("JPEG")}>
                    JPEG
                  </Dropdown.Item>
                  <Dropdown.Item onClick={(e) => setFileFormat("GIF")}>
                    GIF
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Col>
          </Row>
        </Form.Group>

        <Button type="submit">Download Meme</Button>
      </Form>

      <Modal
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      show={props.modalUploadImageShow}
      onHide={() => props.setModalUploadImageShow(false)}
    >
      <img src={props.canvasImage} style={{ width: "auto", height: "auto" }} />
    </Modal>
    </Container>
  );
}

export default GenerateImageTab;
