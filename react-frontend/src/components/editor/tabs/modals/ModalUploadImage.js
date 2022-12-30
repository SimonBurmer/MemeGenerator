import React from "react";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/esm/Button';

function ModalUploadImage(props) {
    function UploadImage() {
      props.addImage(src);
      props.onHide();
    }
  
    function onSourceChange(e) {
      src = URL.createObjectURL(e.target.files[0]);
    }
  
    var src;
  
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Upload Image
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            Wähle eine Bilddatei von deinem PC aus.
          </p>
          <input type="file" onChange={onSourceChange} className="mt-3" />
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
          <Button onClick={UploadImage}>Upload</Button>
        </Modal.Footer>
      </Modal>
    );
  }

  export default ModalUploadImage;