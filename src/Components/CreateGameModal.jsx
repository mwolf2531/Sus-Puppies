import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';


const formMaker = (nameOfForm, type, numMax, numMin, isRequired, cb) => {
  const [integer, setInteger] = useState(1);
  const [boolean, setBoolean] = useState(false);
  const handleChange = (e, stateSet) => {
    const value = e.target.value;
    e.preventDefault();
    const data  = Math.max(Math.min(value, numMax), numMin);
    stateSet(data);
    cb(data)
  };
  return (
    <>
      <label
      htmlFor={`${nameOfForm}-form`}
      >{`${nameOfForm}: `}</label>
      <input
      type="number"
      id={`${nameOfForm}-form`}
      name={`${nameOfForm}`}
      required={isRequired}
      min={numMin}
      max={numMax}
      value={integer}
      onChange={(e) => {
        handleChange(e, setInteger);
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
          <Button
            variant="primary"
            onClick={(e) => {
              e.preventDefault();
              socket?.emit('host-send', options);
              handleClose();
            }}
            >
            Create Game
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default CreateGameModal;