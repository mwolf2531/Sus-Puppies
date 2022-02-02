import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import EndgamePlayerEntry from './EndgamePlayerEntry.jsx';

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
          <Modal.Title>Game Over!</Modal.Title>
        </Modal.Header>
        <Modal.Body>{previousResult}</Modal.Body>
        <Modal.Footer className="results">
          {playerInfo.map((player, idx) => {
            return (<>
              <EndgamePlayerEntry
                player={player}
                key={idx}
              />
              <br></br>
            </>
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