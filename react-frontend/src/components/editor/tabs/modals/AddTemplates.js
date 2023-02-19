import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import React from "react";
import { Form } from 'react-bootstrap';
import InputGroup from 'react-bootstrap/InputGroup';
import { useEffect, useCallback } from "react";

function AddTemplates(props) {
  const [previews, setPreviews] = React.useState([]);
  const [selected, setSelected] = React.useState(-1);

  const fetchTemplates = useCallback(async (which) => {
    let p = []
    if (which === "User") {
      for (let i = 0; i < 5; ++i) {
        p.push("https://www.galileo.tv/app/uploads/2021/03/Wie-entsteht-ein-Meme-Von-der-Idee-bis-zum-viralen-Hit-500x500.jpg")
      }
    } else {
      for (let i = 0; i < 5; ++i) {
        p.push("https://finway.de/wp-content/uploads/blog/de/accounting-memes/accounting-meme-1-friends.png")
      }
    }

    setPreviews(p);
  }, [])
  
  useEffect(() => {
    fetchTemplates("User")
      .catch(console.error);;
  }, [fetchTemplates])


  return (
    <Container>
      <Form >
        <Form.Group required className="mb-3">

          <InputGroup>
            <InputGroup.Text id="btnGroupAddon2">Show</InputGroup.Text>
            <Form.Select
              onChange={e => 
                {
                  fetchTemplates(e.target.value);
                  setSelected(-1);
                }}
            >
              <option value="User" >Your Templates</option>
              <option value="Public">Public Templates</option>
            </Form.Select>
          </InputGroup>

        </Form.Group>
      </Form>


      <Row xs={1} md={2} className="g-4">
         {
            previews.map((element, index) => {
              return <Col key={index}>
                <Card className={selected === index ? "template-card active" : "template-card"} onClick={() => 
                  {
                    props.setImage(element);
                    setSelected(index);
                  }}>
                  <Card.Img variant="top" src={element} />
                  <Card.Body>
                    <Card.Title>Template 1</Card.Title>
                  </Card.Body>
                </Card>
              </Col>
            })
         }
      </Row>
    </Container>
  );
}
export default AddTemplates;
