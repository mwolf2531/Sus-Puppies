import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import Header from './Components/Header.jsx';
import {LivingChat} from './Components/LivingChat.jsx';
import Ruleset from './Components/Ruleset.jsx';
import GameButton from './Components/GameButton.jsx';
import Voting from './Components/Voting.jsx';
import WolfChat from './Components/WolfChat.jsx';
import GhostChat from './Components/GhostChat.jsx';
import Timer from './Components/Timer.jsx';
import PlayerFrame from './Components/PlayerFrame.jsx';



const GamePage = (props) => {

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
      <Header />
      <LivingChat />
      <Ruleset />
      <GameButton />
      <Voting />
      <WolfChat />
      <GhostChat />
      <Timer />
      <PlayerFrame />
    </div>
  )
}

export default GamePage;
