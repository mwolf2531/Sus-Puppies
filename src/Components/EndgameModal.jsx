import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import EndgamePlayerEntry from './EndgamePlayerEntry.jsx';
import { GiCheckMark, GiWolfHowl, GiHeartPlus, GiBleedingEye } from 'react-icons/gi';

const roleIcons = [
  <GiCheckMark size={25} style={{ marginLeft: "-25px", zIndex: "-1", paddingBottom: "5px" }} />,
  <GiWolfHowl size={25} style={{ marginLeft: "-25px", zIndex: "-1", paddingBottom: "5px" }} />,
  <GiHeartPlus size={25} style={{ marginLeft: "-25px", zIndex: "-1", paddingBottom: "5px" }} />,
  <GiBleedingEye size={25} style={{ marginLeft: "-25px", zIndex: "-1", paddingBottom: "5px" }} />
];

const EndgameModal = ({ playerInfo, phaseResults, gameStatus, previousResult }) => {

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    if (gameStatus === 'ended') {
      handleShow();
    }
  }, [gameStatus]);

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
          <Modal.Title>Game Over Results</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>{previousResult}</h4>
          <div style={{paddingLeft:"100px"}}>
            {roleIcons[0]} = Villager
          </div>
          <div style={{paddingLeft:"100px"}}>
            {roleIcons[1]} = Werewolf
          </div>
        </Modal.Body>
        <Modal.Footer
          className="results"
          style={{justifyContent:"space-evenly"}}
        >
          {/* TODO: Does this code work if the player name is "No One" */}
          {playerInfo.map((player, idx) => {
            return (<div>
              <EndgamePlayerEntry
                player={player}
                key={idx}
              />
              <br />
            </div>
            )
          })}
          <Button
            variant="warning"
            onClick={(e) => {
              e.preventDefault();
              handleClose();
            }}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default EndgameModal;


//[day, phase, victim]