import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import InputGroup from 'react-bootstrap/InputGroup';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';


function SearchBar() {
  return (
    <ButtonToolbar className="mb-4 justify-content-between">
 

      {/* 
        <ButtonGroup>
        <Button>Datum:</Button>
        <DropdownButton as={ButtonGroup} title="Absteigend" id="bg-nested-dropdown">
        <Dropdown.Item eventKey="1">Absteigend</Dropdown.Item>
        <Dropdown.Item eventKey="2">Aufsteigend</Dropdown.Item>
        </DropdownButton>
        </ButtonGroup>>
      */}  

      <InputGroup>
        <InputGroup.Text id="btnGroupAddon2">Datum:</InputGroup.Text>
        <Form.Select aria-label="Default select example">
          <option value="1">Absteigend</option>
          <option value="2">Aufsteigend</option>
        </Form.Select>
      </InputGroup>

      <InputGroup>
        <InputGroup.Text id="btnGroupAddon2">Likes:</InputGroup.Text>
        <Form.Select aria-label="Default select example">
          <option>Wähle</option>
          <option value="1">Absteigend</option>
          <option value="2">Aufsteigend</option>
        </Form.Select>
      </InputGroup>

      <InputGroup>
        <InputGroup.Text id="btnGroupAddon2">Kommentare:</InputGroup.Text>
        <Form.Select aria-label="Default select example">
          <option>Wähle</option>
          <option value="1">Absteigend</option>
          <option value="2">Aufsteigend</option>
        </Form.Select>
      </InputGroup>

      <InputGroup>
        <InputGroup.Text id="btnGroupAddon2">Titel:</InputGroup.Text>
        <Form.Control
          type="text"
          placeholder="Titel"
          aria-label="Input group example"
          aria-describedby="btnGroupAddon2"
        />
      </InputGroup>

      <InputGroup>
        <InputGroup.Text id="btnGroupAddon3">Author:</InputGroup.Text>
        <Form.Control
          type="text"
          placeholder="Username"
          aria-label="Input group example3"
          aria-describedby="btnGroupAddon3"
        />
      </InputGroup>

    </ButtonToolbar>
  );
}

export default SearchBar;