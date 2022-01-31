import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';


const formMaker = (nameOfForm, type, numMax, numMin, isRequired, cb) => {
  const [integer, setInteger] = useState(1);
  const [boolean, setBoolean] = useState(false);
  const handleChange = (e, stateSet) => {
    e.preventDefault();
    const data  = Math.max(Math.min(e.target.value, numMax), numMin);
    stateSet(data);
    cb(data)
  };
  let form
  return (
    (type === 'number') ?
    <>
      <label
      htmlFor={`${nameOfForm-form}`}
      >{`${nameOfForm}`}</label>
      <input
      type="number"
      id={`${nameOfForm-form}`}
      name={`${nameOfForm}`}
      required={isRequired}
      min={numMin}
      max={numMax}
      value={integer}
      onChange={(e) => {
        handleChange(e, setInteger);
      }}></input>
    </>
    :
     <>
      <label
      htmlFor={`${nameOfForm-form}`}
      >{`${nameOfForm}`}</label>
      <input
      type="checkbox"
      id={`${nameOfForm-form}`}
      name={`${nameOfForm}`}
      value={boolean}
      onChange={(e) => {
        handleChange(e, setBoolean);
      }}></input>
    </>
  )
}


const CreateGameModal = ({socket, playerState}) => {

  const [show, setShow] = useState(true);
  const options ={
    numPlayers: 1,
    numWolves: 1,
    timer: 1,
    seer: false,
    medic: false,
  };
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const addOptions = (prop) => {

  }
  useEffect(() => {
    if (playerState.host) {
      handleShow();
    }
  }, [socket, playerState]);

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

          {formMaker('Number of players', 'number', 20, 1, true, (data)=> options.numPlayers = data )}
          {formMaker('Number of wolves', 'number', 20, 1, true, (data)=> options.numWolves = data )}
          {formMaker('Timer(seconds)', 'number', 90, 1, true, (data)=> options.timer = data )}
          {formMaker('Seer', 'checkbox', 20, 1, false, (data)=> options.seer = data )}
          {formMaker('Medic', 'checkbox', 20, 1, false, (data)=> options.medic = data )}
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