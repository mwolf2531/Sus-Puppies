import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import werewolfTitle from '../../public/images/werewolf-title.svg';

const formMaker = (nameOfForm, type, numMax, numMin, isRequired, cb) => {
  const [integer, setInteger] = useState(numMin);
  const [boolean, setBoolean] = useState(false);
  const handleChange = (e, stateSet) => {
    const value = e.target.value;
    e.preventDefault();
    const data = Math.max(Math.min(value, numMax), numMin);
    stateSet(data);
    cb(data)
  };
  return (
    <>
      <label
        htmlFor={`${nameOfForm}-form`}
      >{`${nameOfForm}:`}&nbsp;</label>
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


const CreateGameModal = ({ socket, playerState }) => {

  const [show, setShow] = useState(false);
  const [options, setOptions] = useState({
    numWolves: 1,
    timer: 90,
    seer: false,
    healer: false,
  });
  const [picture, setPicture] = useState('s1');
  const [seerChecked, setSeerChecked] = useState(false);
  const [healerChecked, setHealerChecked] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSeerSelect = () => {
    const newOptions = Object.assign(options, { seer: !options.seer });
    setOptions(newOptions);
    setSeerChecked(!seerChecked);
  }

  const handleHealerSelect = () => {
    const newOptions = Object.assign(options, { healer: !options.healer });
    setOptions(newOptions);
    setHealerChecked(!healerChecked)
  }

  const addOptions = (prop) => {

  }
  useEffect(() => {
    if (playerState.host === true) {
      handleShow();
    }
  }, [socket, playerState]);

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
            <img src={werewolfTitle} style={{ height:"35vh", marginTop:"-175px", marginBottom:"-175px" }} />
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Game Options</h4>
          <h5>Suggestions for optimal gameplay:</h5>
          <ul>
            <li>choose 1 werewolf when playing with 5 to 7 players</li>
            <li>choose 2 werewolves when playing with 8 to 10 players</li>
            <li>choose 3 werewolves when playing with 11 or 12 players</li>
          </ul>
          <div>Making more wolves than suggested will make it more difficult for villagers to win</div>
        </Modal.Body>
        <Modal.Footer className="inputs" style={{justifyContent:"space-evenly", paddingRight:"3rem"}}>
          <div>
            {formMaker('Number of wolves', 'number', 4, 1, true, (data) => {
              const newOptions = Object.assign(options, { numWolves: data });
              setOptions(newOptions);
            })}
          </div>
          <div>
            {formMaker('Timer(seconds)', 'number', 300, 60, true, (data) => {
              const newOptions = Object.assign(options, { timer: data });
              setOptions(newOptions);
            })}
          </div>
          {/* TODO - ADD FORM FOR ENABLING/DISABLING SEER
          TODO - ADD FORM FOR ENABLING/DISABLING HEALER */}
          <div>
            <label>
              Seer:&nbsp;
              <input
                type="checkbox"
                checked={seerChecked}
                onChange={handleSeerSelect}
              />
            </label>
          </div>
          <div>
            <label>
              Healer:&nbsp;
              <input
                type="checkbox"
                checked={healerChecked}
                onChange={handleHealerSelect}
              />
            </label>
          </div>
          <Button
            variant="warning"
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