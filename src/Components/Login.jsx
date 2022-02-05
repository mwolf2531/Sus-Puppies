import React, { useState, useEffect } from 'react';
import { Modal, Button, ButtonGroup, ToggleButton } from 'react-bootstrap';
import werewolf from '../../public/images/werewolf.svg';
import werewolfTitle from '../../public/images/werewolf-title.svg';
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
  const [header, setHeader] = useState('');
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleChange = (e, stateSet) => {
    e.preventDefault();
    const data = e.target.value;
    stateSet(data);
  };

  const onChange = (event, { newValue }) => {
    setInputValue(newValue.replace(/\s/g, ''));
  };

  const pictures = [s1, s2, s3, s4, s5, s6, s7, s8, s9, s10, s11, s12, s13, s14, s15, s16, s17, s18, s19, s20]

  useEffect(() => {
    console.log('Sent to server: ', userName, password);
    socket?.on('login-failed', (responseString) => {
      console.log('failed login attempt');
      setHeader(responseString);
    });
    socket?.on('login-success', () => {
      console.log('Good login');
      setShow(false);
    });
  }, [socket]);

  const loginAttempt = () => {
    socket.emit('login', { username: userName, password, picture });
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
        style={{ backgroundColor: "rgba(26, 15, 60, 1) !important" }}
      >
        <Modal.Header closeButton={false} style={{ justifyContent: "space-around" }}>
          <Modal.Title>
            <img src={werewolfTitle} style={{ height: "35vh", marginTop: "-175px", marginBottom: "-175px" }} />
          </Modal.Title>
        </Modal.Header>
        <span style={{ alignSelf: "center" }} >
          <img src={werewolf} style={{ height: "30vh", marginTop: "-35px", marginBottom: "-10px" }} />
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
              onChange={(e) => {
                if (e.target.value.search(/[^a-zA-Z0-9]/g) === -1 && userName.length <= 15) {
                  handleChange(e, setUserName)
                }
              }}
              className="inputs"
              style={{ margin: "5px", color: "black" }}
            />
            <div>
              <label htmlFor="passwordInput">Password:&nbsp;&nbsp;</label>
              <input
                value={password}
                type="password"
                id="passwordInput"
                required={true}
                onChange={(e) => handleChange(e, setPassword)}
                style={{ margin: "5px", color: "black" }}
              />
            </div>
            <div>
              <br />
              <div className="profile-pic">
                <ButtonGroup>
                  {pictures.map((profile, i) => (
                    <ToggleButton
                      key={i}
                      id={`radio-${i}`}
                      type="radio"
                      variant={i % 2 ? 'outline-danger' : 'outline-danger'}
                      name="picture"
                      value={`s${i + 1}`}
                      checked={picture === `s${i + 1}`}
                      onChange={(e) => onValueChange(e)}
                    >
                      <img
                        src={profile}
                        style={{
                          height: "5vh",
                          paddingRight: "3px",
                          backgroundColor: "white",
                          borderRadius: "1em"
                        }}
                      />
                    </ToggleButton>
                  ))}
                </ButtonGroup>
              </div>
              <br />
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