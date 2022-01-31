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
  };

  useEffect(() => {
    console.log('Sent to server: ', userName, password);
    socket?.on('login-failed', (responseString) => {
      console.log('failed login attempt');
      //TODO: implement login failed logic.
      setHeader(responseString);
    });
    socket?.on('login-success', () => {
      console.log('Good login');
      setShow(false);
      //TODO: add some playerstate??????
    });
  }, [socket]);

  const loginAttempt = () => {
    socket.emit('login', {username: userName, password});
    setUserName('');
    setPassword('');
  };
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
          <label htmlFor="userInput">Login Name: </label>
          <input
            value={userName}
            type="text"
            id="userInput"
            required={true}
            onChange={(e) => handleChange(e, setUserName)}
          />
          <label htmlFor="passwordInput">Password: </label>
          <input
            value={password}
            type="password"
            id="passwordInput"
            required={true}
            onChange={(e) => handleChange(e, setPassword)}
            />
          <Button
            variant="primary"
            onClick={(e) => {
              if (userName && password) {
                e.preventDefault();
                loginAttempt()
              } else {
                setHeader('Please enter a username and password')
              }
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