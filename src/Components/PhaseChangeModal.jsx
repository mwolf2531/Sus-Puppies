import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Claw from './Claw.jsx';
import Expire from './Expire.jsx';

import useSound from 'use-sound';
import wolfSound from '../../public/sounds/wolfSound.mp3';
import noDeathSound from '../../public/sounds/mixkit-magic-festive-melody-2986.wav';
import wolfHowl from '../../public/sounds/werewolf-howl.mp3';

const PhaseChangeModal = ({
  socket,
  currentPhase,
  previousResult,
  phaseResults,
  gameStatus,
}) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [playWolfEat] = useSound(wolfSound);
  const [playNoDeath] = useSound(noDeathSound, { volume: 0.25 });
  const [wolvesWin] = useSound(wolfHowl, { volue: 0.5 });

  useEffect(
    () => {
      if (
        gameStatus === 'playing' &&
        previousResult !== 'Villagers Win!' &&
        previousResult !== 'Wolves Win!'
      ) {
        if (
          previousResult === 'No one was eaten last night!' ||
          previousResult === 'No one was killed yesterday.'
        ) {
          playNoDeath();
        } else {
          playWolfEat();
        }
        handleShow();
      } else if (previousResult === 'Wolves Win!') {
        wolvesWin();
      }
    },
    [previousResult],
    [gameStatus]
  );

  let dizplay;
  if (currentPhase === 'day') {
    dizplay = (
      <Expire delay="2500">
        <Claw />
      </Expire>
    );
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
        <Modal.Header closeButton={false}></Modal.Header>
        <Modal.Body>
          {previousResult}&nbsp;
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            {dizplay}
          </div>
        </Modal.Body>
        <Modal.Footer className="inputs">
          <Button
            variant="warning"
            onClick={(e) => {
              e.preventDefault();
              handleClose();
            }}
          >
            Next Phase
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default PhaseChangeModal;
