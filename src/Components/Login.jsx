import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import werewolf from '../../public/images/werewolf.svg';
import s1 from '../../public/images/1.svg';
import s2 from '../../public/images/2.svg';
import s3 from '../../public/images/3.svg';
import s4 from '../../public/images/4.svg';
import s5 from '../../public/images/5.svg';
import s6 from '../../public/images/6.svg';
import s7 from '../../public/images/7.svg';
import s8 from '../../public/images/8.svg';
import s9 from '../../public/images/9.svg';
import s10 from '../../public/images/10.svg';
import s11 from '../../public/images/11.svg';
import s12 from '../../public/images/12.svg';
import s13 from '../../public/images/13.svg';
import s14 from '../../public/images/14.svg';
import s15 from '../../public/images/15.svg';
import s16 from '../../public/images/16.svg';
import s17 from '../../public/images/17.svg';
import s18 from '../../public/images/18.svg';
import s19 from '../../public/images/19.svg';
import s20 from '../../public/images/20.svg';
import Carousel from 'react-bootstrap/Carousel';


const Login = ({ socket }) => {

  const [show, setShow] = useState(true);
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [picture, setPicture] = useState('s1');
  const [header, setHeader] = useState('Please Log in :]');
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleChange = (e, stateSet) => {
    e.preventDefault();
    const data = e.target.value;
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
    socket.emit('login', { username: userName, password, picture }); //TODO: emit picture
    setUserName('');
    setPassword('');
    setPicture('s1');
  };

  const onValueChange = (e) => {
    console.log('picture selected: ', e.target.value);
    setPicture(e.target.value);
  }

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        enforceFocus={true}
      >
        <Modal.Header closeButton={false}>
          <Modal.Title style={{ position: "center" }}>Welcome to Sus Puppies!</Modal.Title>
        </Modal.Header>
        <span style={{ alignSelf: "center" }} >
          <img src={werewolf} style={{ height: "30vh" }} />
        </span>
        <Modal.Body>{`${header}`}</Modal.Body>
        <Modal.Footer
          style={{ justifyContent: "center" }}
        >
          <div className="inputs">
            <label htmlFor="userInput">Username:&nbsp;</label>
            <input
              value={userName}
              type="text"
              id="userInput"
              required={true}
              onChange={(e) => handleChange(e, setUserName)}
              className="inputs"
            />
            <div>
              <label htmlFor="passwordInput">Password:&nbsp;&nbsp;</label>
              <input
                value={password}
                type="password"
                id="passwordInput"
                required={true}
                onChange={(e) => handleChange(e, setPassword)}
              />
            </div>
            <br />
            <div>
              <Carousel variant="dark">
                <Carousel.Item>
                  <input
                    type="radio"
                    value="s1"
                    name="picture"
                    checked={picture === "s1"}
                    onChange={(e) => onValueChange(e)}
                  />
                  <img src={s1} style={{ height: "5vh", paddingRight: "3px" }} />
                  {' '}
                </Carousel.Item>
                <Carousel.Item>
                  <input
                    type="radio"
                    value="s3"
                    name="picture"
                    checked={picture === "s3"}
                    onChange={(e) => onValueChange(e)}
                  />
                  <img src={s3} style={{ height: "5vh", paddingRight: "3px" }} />
                  {' '}
                </Carousel.Item>
                {/* <input
                    type="radio"
                    value="s4"
                    name="picture"
                    checked={picture === "s4"}
                    onChange={(e) => onValueChange(e)}
                  />
                  <img src={s4} style={{ height: "5vh", paddingRight: "3px" }} />
                  {' '}
                  <input
                    type="radio"
                    value="s5"
                    name="picture"
                    checked={picture === "s5"}
                    onChange={(e) => onValueChange(e)}
                  />
                </Carousel.Item>
                <img src={s5} style={{ height: "5vh", paddingRight: "3px" }} /> */}
              </Carousel>
            </div>
          </div>
          <br />
        </Modal.Footer>
        <Button
          variant="warning"
          onClick={(e) => {
            if (userName && password) {
              e.preventDefault();
              loginAttempt()
            } else {
              setHeader('Please enter a username and password')
            }
          }}
          style={{ width: "60%", display: "block", alignSelf: 'center' }}
        >
          Login
        </Button>
        <br />
      </Modal>
    </>
  );
}

export default Login;