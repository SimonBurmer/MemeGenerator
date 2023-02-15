import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import React from "react";
import { Form } from 'react-bootstrap';
import InputGroup from 'react-bootstrap/InputGroup';
import { useEffect } from "react";


function Template(props) {

  function setTemplate() {
    props.setImage(props.imgSrc)
    // props.uploadImage() <--- Geht nicht!!!
    props.clearSelection();
  }

  return (
    <Col>
      <Card className={props.selected === this ? "template-card active" : "template-card"} onClick={() => props.select(this)}>
        <Card.Img variant="top" src={props.imgSrc} />
        <Card.Body>
          <Card.Title>Template 1</Card.Title>
        </Card.Body>
      </Card>
    </Col>
  );
}


function AddTemplates(props) {
  const [templates, setTemplates] = React.useState([]);
  const [selected, setSelected] = React.useState(null);

  useEffect(() => {
    let previews = []
    for (let i = 0; i < 5; ++i) {
      previews.push(<Template selected={selected} select={select} setImage={props.setImage} uploadImage={props.uploadImage} imgSrc={"https://www.galileo.tv/app/uploads/2021/03/Wie-entsteht-ein-Meme-Von-der-Idee-bis-zum-viralen-Hit-500x500.jpg"} />)
    }
    setTemplates(previews)
  }, []);

  function select(template)
  {
    setSelected(template);

    props.setImage(template.imgSrc);
  }

  function clearSelection()
  {
    templates.forEach(template => template.clear());
  }

  function getTemplates(which) {
    if (which === "User") {
      let previews = []
      for (let i = 0; i < 5; ++i) {
        previews.push(<Template selected={selected} select={select} setImage={props.setImage} imgSrc={"https://www.galileo.tv/app/uploads/2021/03/Wie-entsteht-ein-Meme-Von-der-Idee-bis-zum-viralen-Hit-500x500.jpg"} />)
      }
      setTemplates(previews)
    } else {
      let previews = []
      for (let i = 0; i < 5; ++i) {
        previews.push(<Template selected={selected} select={select} setImage={props.setImage} imgSrc={"https://finway.de/wp-content/uploads/blog/de/accounting-memes/accounting-meme-1-friends.png"} />)
      }
      setTemplates(previews)
    }

  }

  return (
    <>
      <Form >
        <Form.Group required className="mb-3">

          <InputGroup>
            <InputGroup.Text id="btnGroupAddon2">Show</InputGroup.Text>
            <Form.Select
              onChange={e => getTemplates(e.target.value)}
            >
              <option value="User" >Your Templates</option>
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
