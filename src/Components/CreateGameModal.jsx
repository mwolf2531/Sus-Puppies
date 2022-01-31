import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';


const CreateGameModal = ({socket}) => {

  const [show, setShow] = useState(true);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleChange = (e, stateSet) => {
    e.preventDefault();
    const data  = e.target.value;
    stateSet(data);
  };

  useEffect(() => {
  }, [socket]);


  return (
    <>
      <Modal
      show={show}
      onHide={handleClose}
      enforceFocus={true}
      >
        <Modal.Header closeButton={false}>
          <Modal.Title>Welcome to Sus Puppies!</Modal.Title>
        </Modal.Header>
        <Modal.Body>Game Options</Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            onClick={(e) => {handleClose}}
            >
            Create Game
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default CreateGameModal;