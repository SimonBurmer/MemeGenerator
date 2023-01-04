import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

//        <Button variant="primary">Select</Button>

function Template() {
  return (
    <Col>
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src="holder.js/100px180" />
      <Card.Body>
        <Card.Title>Tamplate 1</Card.Title>

      </Card.Body>
    </Card>
    </Col>
  );
}

function AddTemplates() {
  let previews = []
  for (let i = 0; i < 5; ++i) {
    previews.push(<Template />)
  }

  return (
    <Row xs={1} md={2} className="g-4">
      {previews}
    </Row>
  );
}
export default AddTemplates;
