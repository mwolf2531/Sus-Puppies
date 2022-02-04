import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Claw from './Claw.jsx';
import Expire from './Expire.jsx';
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

import useSound from 'use-sound';
import wolfSound from '../../public/sounds/wolfSound.mp3';
import noDeathSound from '../../public/sounds/mixkit-magic-festive-melody-2986.wav';
import wolfHowl from '../../public/sounds/werewolf-howl.mp3';

const pictures = {
  s1: s1,
  s2: s2,
  s3: s3,
  s4: s4,
  s5: s5,
  s6: s6,
  s7: s7,
  s8: s8,
  s9: s9,
  s10: s10,
  s11: s11,
  s12: s12,
  s13: s13,
  s14: s14,
  s15: s15,
  s16: s16,
  s17: s17,
  s18: s18,
  s19: s19,
  s20: s20,
}

const PhaseChangeModal = ({
  socket,
  currentPhase,
  previousResult,
  phaseResults,
  gameStatus,
  playerInfo,
}) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [playWolfEat] = useSound(wolfSound);
  const [playNoDeath] = useSound(noDeathSound, { volume: 0.25 });
  const [wolvesWin] = useSound(wolfHowl, { volue: 0.5 });
  const [player, setPlayer] = useState({
    username: null,
    player_id: null,
    role: null,
  })

  useEffect(
    () => {
      if (
        gameStatus === 'playing' &&
        previousResult !== 'Villagers Win!' &&
        previousResult !== 'Wolves Win!'
      ) {
        if (previousResult.indexOf('killed') !== -1) {
          let name = previousResult.split(' ')[0];
          setPlayer(playerInfo.find(player => player.username === name));
        } else if (previousResult.indexOf('eaten') !== -1) {
          playWolfEat();
          let name = previousResult.split(' ')[0];
          setPlayer(playerInfo.find(player => player.username === name));
        } else if (
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
        <Modal.Body
          style={{height:"50vh"}}
        >
          {previousResult}&nbsp;
          {player.username !== null
          ? (<img src={pictures[player.picture]}
            style={{
              height: "30vh",
              backgroundColor: "white",
              borderRadius: '1em',
              margin: "15%",
            }} />)
          : null}
          <div style={{ display: 'flex', justifyContent: 'center', marginTop:"-37vh" }}>
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
