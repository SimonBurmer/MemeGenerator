import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import React from "react";
import Modal from "react-bootstrap/Modal";
import { Form, Button } from "react-bootstrap";
import { saveAs } from "file-saver";
import { useState, useEffect } from "react";
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
  const templateService = new TemplateService();
  const memeService = new MemeService();
  const isAuthenticated = useLoggedInStore((state) => state.loggedIn);
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    window.addEventListener("offline", () => setIsOnline(false));
    window.addEventListener("online", () => setIsOnline(true));

    return () => {
      window.removeEventListener("offline", () => setIsOnline(false));
      window.removeEventListener("online", () => setIsOnline(true));
    };
  }, []);

  useEffect(() => {
    console.log(props.modalUploadImageShow);
  }, [props.modalUploadImageShow]);

  useEffect(() => {
    const fetchData = async (offlineMemes) => {
      const imageBlob = await fetch(offlineMemes[0]).then((r) => r.blob());
      let formData = new FormData();
      formData.append("file", imageBlob, "image." + fileFormat);
      let userData = localStorage.getItem("loginData");
      let obj = JSON.parse(userData);
      var decodedJwt = jwt_decode(obj.jwtoken);
      const responseMeme = await memeService.publishMeme(
        formData,
        offlineMemes[1],
        decodedJwt.id,
        obj.name,
        offlineMemes[4],
        offlineMemes[5],
        offlineMemes[6],
        offlineMemes[7],
        offlineMemes[8]
      );
    };
    if (isOnline && isAuthenticated) {
      let offlineMemes = JSON.parse(localStorage.getItem("offlineMemes"));
      if (!(offlineMemes === null)) {
        offlineMemes.forEach((offlineMemes) => {
          fetchData(offlineMemes);
        });
      }
      localStorage.removeItem("offlineMemes");
    }
  }, [isOnline]);

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
    props.updateCanvas(async (dataUrl) => {
      event.preventDefault();
      const imageUrl = dataUrl;

      var der = null;
      switch (fileFormat) {
        case "gif":
          der = await fetch(imageUrl).then((r) => r.blob());
          break;
        default:
          const imageBlob = await fetch(imageUrl).then((r) => r.blob());
          der = await resizeFile(imageBlob);
          break;
      }

      saveAs(der, fileName + "." + fileFormat);
    }, false);
  }

  function saveMemeOnServer() {
    const generatedMeme = new GeneratedMeme(
      memeTitle,
      memeDescription,
      props.canvasImage
    );
  }

  function saveMemeAsTemplate(event) {
    props.updateCanvas(async (dataUrl) => {
      //props.setModalUploadImageShow(true);
      event.preventDefault();
      const publishType = event.nativeEvent.submitter.name;
      const imageUrl = dataUrl;
      const imageBlob = await fetch(imageUrl).then((r) => r.blob());
      let formData = new FormData();
      formData.append("file", imageBlob, "image." + fileFormat);
      if (isOnline) {
        if (isAuthenticated) {
          let userData = localStorage.getItem("loginData");
          let obj = JSON.parse(userData);
          var decodedJwt = jwt_decode(obj.jwtoken);

          if (publishType === "templateButton") {
            const responseTemplate = await templateService.uploadTemplate(
              formData,
              decodedJwt.id,
              memeTitle,
              accessibility
            );
          }
          if (publishType === "memeButton") {
            if (fileFormat === "gif") {
              const responseMeme = await memeService.publishMeme(
                formData,
                memeTitle,
                decodedJwt.id,
                obj.name,
                accessibility,
                "",
                props.textBlocks,
                500,
                300
              );
            } else {
              const responseMeme = await memeService.publishMeme(
                formData,
                memeTitle,
                decodedJwt.id,
                obj.name,
                accessibility,
                props.images,
                props.textBlocks,
                500,
                500
              );
            }
          }
        }
      } else {
        updateOfflineStorage(imageUrl);
      }
    }, false);

    //const der = await resizeFile(imageBlob);
  }

  function updateOfflineStorage(imageUrl) {
    console.log(imageUrl);
    let offlineMemes = JSON.parse(localStorage.getItem("offlineMemes"));
    if (offlineMemes === null) {
      let newMeme = [
        [
          imageUrl,
          memeTitle,
          null,
          null,
          accessibility,
          props.images,
          props.textBlocks,
          500,
          500,
        ],
      ];
      localStorage.setItem("offlineMemes", JSON.stringify(newMeme));
    } else {
      let newMeme = [
        imageUrl,
        memeTitle,
        null,
        null,
        accessibility,
        props.images,
        props.textBlocks,
        500,
        500,
      ];
      offlineMemes.push(newMeme);
      localStorage.removeItem("offlineMemes");
      console.log(offlineMemes);
      localStorage.setItem("offlineMemes", JSON.stringify(offlineMemes));
    }
  }

  return (
    <Container className="image-options-container">
      <Row className="">
        <Button
          onClick={() => {
            props.updateCanvas((dataUrl) => {
              props.setModalUploadImageShow(true);
            }, true);
          }}
        >
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
          <Row>
            <Col>
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
                  <Dropdown.Item onClick={(e) => setFileFormat("gif")}>
                    gif
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Col>
          </Row>
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
                  <Dropdown.Item onClick={(e) => setFileFormat("gif")}>
                    gif
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
        <img
          src={props.canvasImage}
          style={{ width: "auto", height: "auto" }}
        />
      </Modal>
    </Container>
  );
}

export default GenerateImageTab;
