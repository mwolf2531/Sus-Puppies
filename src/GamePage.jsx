import React, { useState } from 'react';
import styled from 'styled-components';
import data from './mockData.js';
import Header from './Components/Header.jsx';
// import CenterDisplay from './CenterDisplay.jsx';
// import PlayerFrame from './PlayerFrame.jsx';
// import LivingChat from './LivingChat.jsx';
// import WolvesChat from './WolvesChat.jsx';
// import ChatToggle from './ChatToggle.jsx';
// import Voting from './Voting.jsx';
// import Ruleset from './Ruleset.jsx';
// import StartButton from './StartButton.jsx';


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
      <Header props={phaseResult} />
      <div>CenterDisplay</div>
      <div>PlayerFrame</div>
      <div>LivingChat</div>
      <div>WolvesChat</div>
      <div>ChatToggle</div>
      <div>Voting</div>
      <div>Ruleset</div>
      <div>StartButton</div>
    </div>)
}

export default GamePage;
