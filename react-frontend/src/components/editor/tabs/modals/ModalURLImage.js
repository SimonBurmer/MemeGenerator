import React from "react";
import Modal from 'react-bootstrap/Modal';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/esm/Button';

function ModalURLImage(props) {
    const [url, setUrl] = React.useState(null);
  
    const fetchImage = async () => {
  
      const res = await fetch(url);
      const imageBlob = await res.blob();
      const imageObjectURL = URL.createObjectURL(imageBlob);
      props.addImage(imageObjectURL);
    };
  
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Enter Image URL
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            Gib eine URL zu einer Bilddatei an.
          </p>
  
          <Form>
            <InputGroup className="mb-3">
              <InputGroup.Text>URL</InputGroup.Text>
              <Form.Control value={url} onChange={evt => setUrl(evt.target.value)} />
              <Button variant="danger" onClick={fetchImage}>
                Upload
              </Button>
            </InputGroup>
            </Form>
  
  
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }

  export default ModalURLImage;