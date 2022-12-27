import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import InputGroup from 'react-bootstrap/InputGroup';

function UserSettings() {
  return (
    <Container>

      <InputGroup className="mb-3">
        <InputGroup.Text>Email&ensp; &ensp; &ensp;</InputGroup.Text>
        <Form.Control
          placeholder="TODO: Show User-Email here"
          aria-label="User Email"
          aria-describedby="basic-addon2"
        />
        <Button variant="outline-secondary" id="button-addon2">
          Ändern
        </Button>
      </InputGroup>


      <InputGroup className="mb-3">
        <InputGroup.Text>Password</InputGroup.Text>
        <Form.Control
          placeholder="New Password"
          aria-label="New Password"
          aria-describedby="basic-addon2"
          type="password"
        />
        <Button variant="outline-secondary" id="button-addon2">
          Ändern
        </Button>
      </InputGroup>


    </Container>
  );
}

export default UserSettings;