import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';


const Login = ({socket}) => {

  const [show, setShow] = useState(true);
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [header, setHeader] = useState('Please Log in :]');
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleChange = (e, stateSet) => {
    e.preventDefault();
    const data  = e.target.value;
    stateSet(data);
  }
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
        <Modal.Body>{`${header}`}</Modal.Body>
        <Modal.Footer>
          <label for="userInput">Login Name: </label>
          <input
            value={userName}
            type="text"
            id="userInput"
            onChange={(e) => handleChange(e, setUserName)}
          />
          <label for="passwordInput">Password: </label>
          <input
            value={password}
            type="text"
            id="passwordInput"
            onChange={(e) => handleChange(e, setPassword)}
            />
          <Button
            variant="primary"
            onClick={(e) => {
              e.preventDefault();

              handleClose();
            }}
            >
            Login
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Login;