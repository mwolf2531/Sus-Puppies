import React, { useState } from 'react';
import styled from 'styled-components';
import { gameState, playerState } from './mockData.js';
import PlayerFrame from './Components/PlayerFrame.jsx';
import Ruleset from './Components/Ruleset.jsx';
import Header from './Components/Header.jsx';
import LivingChat from './Components/LivingChat.jsx';
import GhostChat from './Components/GhostChat.jsx';
import WolfChat from './Components/WolfChat.jsx';
import Timer from './Components/Timer.jsx';
import GameButton from './Components/GameButton.jsx';
import Voting from './Components/Voting.jsx';



const GamePage = () => {

  //Note: These states are not final in anyway.
  const [time, setTime] = useState(0);
  const [previousResult, setPreviousResult] = useState('');
  const [currentDay, setCurrentDay] = useState(0);
  const [currentPhase, setCurrentPhase] = useState('');
  const [playerRoles, setPlayerRoles] = useState([]);
  const [voting, setVoting] = useState([]);
  const [gameStatus, setGameStatus] = useState('');
  const [phaseResults, setPhaseResults] = useState([]);

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
