import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';


const formMaker = (nameOfForm, type, numMax, isRequired) => {
  const [integer, setInteger] = useState(1);
  const [boolean, setBoolean] = useState(false);
  const handleChange = (e, stateSet) => {
    e.preventDefault();
    const data  = e.target.value;
    stateSet(data);
  };
  return (
    type === 'number' ?
    <label
    htmlFor={`${nameOfForm-form}`}
    >{`${nameOfForm}`}</label>
    <input
    type="number"
    id={`${nameOfForm-form}`}
    name={`${nameOfForm}`}
    required={isRequired}
     minlength="4" maxlength="8"
     size="10"></input>
     : null

  )

}
const CreateGameModal = ({socket}) => {

  const [show, setShow] = useState(true);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


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