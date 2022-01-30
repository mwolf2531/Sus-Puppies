import React, { useState } from 'react';
import styled from 'styled-components';

import Header from './Components/Header.jsx';
import LivingChat from './Components/LivingChat.jsx';
import Ruleset from './Components/Ruleset.jsx';
import GameButton from './Components/GameButton.jsx';
import Voting from './Components/Voting.jsx';
import WolfChat from './Components/WolfChat.jsx';
import GhostChat from './Components/GhostChat.jsx';
import Timer from './Components/Timer.jsx';
import PlayerFrame from './Components/PlayerFrame.jsx';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Stack from 'react-bootstrap/Stack';



const GamePage = () => {

  //Note: These states are not final in anyway.
  const [time, setTime] = useState(0);
  const [centerDisplay, setCenterDisplay] = useState({});
  const [phaseResult, setPhaseResult] = useState({
    message: 'Dare died last night',
    currentDay: 'day',
  });
  const [currentDay, setCurrentDay] = useState('day');
  const [gameRules, setGameRules] = useState({});
  const [allPlayerInfo, setAllPlayerInfo] = useState({});
  const [gameLogic, setGameLogic] = useState({});
  const [votingRecord, setVotingRecord] = useState({});

  //TODO: Add Lifecycle methods as needed.

  //TODO: create handleFunctions. Esp for GameEvents

  const handlePhaseChange = () => {
    //TODO:
  }
  const handleVoting = () => {
    //TODO:
  }
  const handleEndOfGame = () => {
    //TODO:
  }

  //Note: Divs are being used as place holders to avoid errors for missing components
  return (
    //TODO: Fill in components properly with handlers.
    <div>
      <Container>
        <Row>
          <Col>
            <Header />
          </Col>
        </Row>
        <Row>
          <Col xs={4}>
            <LivingChat />
          </Col>
          <Col>
            <PlayerFrame />
          </Col>
          <Col>
            <Timer />
          </Col>
          <Col>
            <GhostChat />
          </Col>
        </Row>
        <Row>
          <Col>
            <Ruleset />
          </Col>
          <Col>
            <GameButton />
            <Voting />
          </Col>
          <Col>
            <WolfChat />
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default GamePage;
