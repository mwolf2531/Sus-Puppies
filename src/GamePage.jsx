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
  const [timer, setTimer] = useState(0);
  const [previousResult, setPreviousResult] = useState('');
  const [currentDay, setCurrentDay] = useState(0);
  const [currentPhase, setCurrentPhase] = useState('');
  const [playerRoles, setPlayerRoles] = useState([]);
  const [voting, setVoting] = useState([]);
  const [gameStatus, setGameStatus] = useState('');
  const [phaseResults, setPhaseResults] = useState([]);
  const [playerInfo, setPlayerInfo] = useState([]);
  const [ghostChats, setGhostChats] = useState([]);
  const [livingChats, setLivingChats] = useState([]);
  const [wolfChats, setWolfChats] = useState([]);
  const [host, setHost] = useState('');
  const [playerId, setPlayerId] = useState('');


  //TODO: Add Lifecycle methods as needed.

  //TODO: create handleFunctions. Esp for GameEvents

  const handlePhaseChange = () => {
    //TODO: needs to update currentDay and currentPhase on server when timer runs out
  }
  //QUESTION: are individual player votes sent individually to the server?
  // or are they updated in GamePage to be sent up all together?
  const handleVoting = () => {
    //TODO: needs to send voting object to the server to get phaseResults
  }
  const handleEndOfGame = () => {
    //endgame conditions might automatically be determined from the server
    //TODO: needs to send playerRoles (and voting?) to server to determine if game ends
  }
  const handlePlayerJoiningGame = () => {
    //TODO: needs to tell server when a new player has connected
      //assign player_id, take in user's name and user's chosen icon/image
  }

  //Note: Divs are being used as place holders to avoid errors for missing components
  return (
    //TODO: Fill in components properly with handlers.
    <div>
      <Header
        previousResult={previousResult}
        currentDay={currentDay}
        currentPhase={currentPhase}
      />
      <LivingChat
        livingChats={livingChats}
        playerInfo={playerInfo}
        playerId={playerId}
      />
      <Ruleset
        {/* gameLogic object containing game-specific rules (# of wolves, etc) */}
      />
      <GameButton
        playerId={playerId}
        gameStatus={gameStatus}
      />
      <Voting
        timer={timer}
        playerInfo={playerInfo}
        currentPhase={currentPhase}
        playerRoles={playerRoles}
      />
      <WolfChat
        wolfChats={wolfChats}
        playerInfo={playerInfo}
        playerId={playerId}
        playerRoles={playerRoles}
      />
      <GhostChat
        ghostChats={ghostChats}
        playerInfo={playerInfo}
        playerId={playerId}
        playerRoles={playerRoles}
      />
      <Timer
        timer={timer}
        currentPhase={currentPhase}
      />
      <PlayerFrame
        voting={voting}
        playerInfo={playerInfo}
        currentPhase={currentPhase}
      />
    </div>
  )
}

export default GamePage;
