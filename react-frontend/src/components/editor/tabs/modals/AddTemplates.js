import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import React from "react";
import { Form } from "react-bootstrap";
import InputGroup from "react-bootstrap/InputGroup";
import { useEffect, useState } from "react";
import TemplateService from "../../../../services/templateService";

function Template(props) {
  function setTemplate() {
    props.setImage(props.imgSrc);
    // props.uploadImage() <--- Geht nicht!!!
  }

  return (
    <Col>
      <Card style={{ width: "18rem", cursor: "pointer" }} onClick={setTemplate}>
        <Card.Img variant="top" src={props.imgSrc} />
        <Card.Body>
          <Card.Title>Template 1</Card.Title>
        </Card.Body>
      </Card>
    </Col>
  );
}

function AddTemplates(props) {
  const templateService = new TemplateService();
  const [templates, setTemplates] = useState(null);
  const [prev, setPrev] = useState([]);

  useEffect(() => {
    const fetchDataFromAPI = async () => {
      const allMemes = await templateService.getAllTemplates();
      setPrev(allMemes);
    };
    fetchDataFromAPI();
  }, []);

  useEffect(() => {
    console.log(prev.length);
    if (prev.length > 0) {
      let previews = [];
      for (let i = 0; i < prev.length; ++i) {
        previews.push(
          <Template
            setImage={props.setImage}
            uploadImage={props.uploadImage}
            imgSrc={prev[i].url}
          />
        );
      }
      setTemplates(previews);
    }
  }, [prev]);

  // const fetchTemplates = async () => {
  //   const allMemes = await templateService.getAllTemplates();
  //   console.log(allMemes);
  //   setPrev(allMemes);
  // };

  // function getTemplates(which) {
  //   if (which === "User") {
  //     let previews = [];
  //     for (let i = 0; i < 5; ++i) {
  //       previews.push(
  //         <Template
  //           setImage={props.setImage}
  //           imgSrc={
  //             "https://www.galileo.tv/app/uploads/2021/03/Wie-entsteht-ein-Meme-Von-der-Idee-bis-zum-viralen-Hit-500x500.jpg"
  //           }
  //         />
  //       );
  //     }
  //     setTemplates(previews);
  //   } else {
  //     let previews = [];
  //     for (let i = 0; i < 5; ++i) {
  //       previews.push(
  //         <Template
  //           setImage={props.setImage}
  //           imgSrc={
  //             "https://finway.de/wp-content/uploads/blog/de/accounting-memes/accounting-meme-1-friends.png"
  //           }
  //         />
  //       );
  //     }
  //     setTemplates(previews);
  //  }
  //}

  return (
    <>
      <Form>
        <Form.Group required className="mb-3">
          <InputGroup>
            <InputGroup.Text id="btnGroupAddon2">Show</InputGroup.Text>
            <Form.Select onChange={(e) => {}}>
              <option value="User">Your Templates</option>
              <option value="Public">Public Templates</option>
            </Form.Select>
          </InputGroup>
        </Form.Group>
      </Form>

      <Row xs={1} md={2} className="g-4">
        {templates}
      </Row>
    </>
  );
}
export default AddTemplates;
