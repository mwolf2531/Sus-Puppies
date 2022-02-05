import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { data } from './mockData.js';
import PlayerFrame from './Components/PlayerFrame.jsx';
import Ruleset from './Components/Ruleset.jsx';
import Header from './Components/Header.jsx';
import LivingChat from './Components/LivingChat.jsx';
import GhostChat from './Components/GhostChat.jsx';
import WolfChat from './Components/WolfChat.jsx';
import Timer from './Components/Timer.jsx';
import GameButton from './Components/GameButton.jsx';
import Voting from './Components/Voting.jsx';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Stack from 'react-bootstrap/Stack';
import Login from './Components/Login.jsx';
import CreateGameModal from './Components/CreateGameModal.jsx';
import EndgameModal from './Components/EndgameModal.jsx';
import PhaseChangeModal from './Components/PhaseChangeModal.jsx';

import useSound from 'use-sound';
import wolfSound from '../public/sounds/wolfSound.mp3';

import { io } from 'socket.io-client';

const GamePage = () => {
  const [timer, setTimer] = useState(0);
  const [previousResult, setPreviousResult] = useState('Welcome to Day 0!');
  const [currentDay, setCurrentDay] = useState(0);
  const [currentPhase, setCurrentPhase] = useState('');
  const [votes, setVotes] = useState([]);
  const [gameStatus, setGameStatus] = useState('setup');
  const [phaseResults, setPhaseResults] = useState([]);
  const [playerInfo, setPlayerInfo] = useState([]);
  const [host, setHost] = useState('');
  const [playerState, setPlayerState] = useState({});
  const [wolves, setWolves] = useState(1);
  const [initialTimer, setInitialTimer] = useState(90);
  const [rules, setRules] = useState({
    numWolves: 1,
    timer: 90,
    seer: false,
    healer: false,
  });
  const [seerMessage, setSeerMessage] = useState('');

  const [socket, setSocket] = useState(null);

  useEffect(() => {
    // change to public URL for deployement => example: 'http://3.83.40.231:3000'
    setSocket(io());
  }, []);

  //TODO: Add Lifecycle methods as needed.
  useEffect(() => {
    socket?.on('phaseChange-feed', (gameStateObj) => {
      // TODO: GameState object to be desctructred and update state
      // Deconstruct the gameStateObj, write state with new data
    });
    socket?.on('timer-feed', (timeData) => {
      setTimer(timeData);
    });
    socket?.on('gameStatus-feed', (status) => {
      setGameStatus(status);
    });
    socket?.on('playerState-feed', (playerStateObject) => {
      console.log('playerStateObject:', playerStateObject);
      setPlayerState(playerStateObject);
    });

    socket?.on(
      'gameState-feed',
      ({
        timer,
        previousResult,
        currentDay,
        currentPhase,
        phaseResults,
        playerInfo,
        gameStatus,
        votes,
        initWolves,
        initTimer,
        seerMessage,
        wolves,
        isSeer,
        isHealer,
      }) => {
        setPlayerInfo(playerInfo);
        setTimer(timer);
        setPreviousResult(previousResult);
        setCurrentDay(currentDay);
        setCurrentPhase(currentPhase);
        setPhaseResults(phaseResults);
        setGameStatus(gameStatus);
        setWolves(initWolves);
        setInitialTimer(initTimer);
        setSeerMessage(seerMessage);
        setRules({
          numWolves: wolves.number,
          timer: initTimer,
          seer: isSeer,
          healer: isHealer,
        });
      }
    );
    const newPlayerState = playerInfo.find(
      (player) => player.player_id === playerState.player_id
    );
    if (playerState.role === 0) {
      if (playerState.role != newPlayerState.role) {
        setPlayerState(newPlayerState);
      }
    }
  }, [socket]);

  //TODO: create handleFunctions. Esp for GameEvents

  const handlePhaseChange = () => {
    //TODO: needs to update currentDay and currentPhase on server when timer runs out
  };
  //QUESTION: are individual player votes sent individually to the server?
  // or are they updated in GamePage to be sent up all together?
  const handleVoting = () => {
    //TODO: needs to send voting object to the server to get phaseResults
  };
  const handleEndOfGame = () => {
    //endgame conditions might automatically be determined from the server
    //TODO: needs to send playerRoles (and voting?) to server to determine if game ends
  };
  const handlePlayerJoiningGame = () => {
    //TODO: needs to tell server when a new player has connected
    //assign player_id, take in user's name and user's chosen icon/image
  };
  //Note: Divs are being used as place holders to avoid errors for missing components
  return (
    //TODO: Fill in components properly with handlers.
    <>
      <Container fluid className="set-height" id="game">
        <Login socket={socket} />
        <CreateGameModal socket={socket} playerState={playerState} />
        <EndgameModal
          playerInfo={playerInfo}
          phaseResults={phaseResults}
          gameStatus={gameStatus}
          previousResult={previousResult}
        />
        <PhaseChangeModal
          playerState={playerState}
          previousResult={previousResult}
          currentPhase={currentPhase}
          gameStatus={gameStatus}
          playerInfo={playerInfo}
        />
        <Row id="header">
          <Col>
            <Header
              previousResult={previousResult}
              currentDay={currentDay}
              currentPhase={currentPhase}
            />
          </Col>
        </Row>
        <Row id="chat-row">
          <Col xs={3} className="column whiteCard">
            <LivingChat
              currentPhase={currentPhase}
              playerInfo={playerInfo}
              playerState={playerState}
              socket={socket}
            />
          </Col>
          <Col className="column">
            <PlayerFrame
              votes={votes}
              playerInfo={playerInfo}
              currentPhase={currentPhase}
              timer={timer}
            />
          </Col>
          <Col xs={3} className="column whiteCard">
            <GhostChat
              playerInfo={playerInfo}
              playerState={playerState}
              socket={socket}
            />
          </Col>
        </Row>
        <Row id="bottom-row">
          <Col className="column whiteCard">
            <Ruleset
              wolves={wolves}
              playerState={playerState}
              initialTimer={initialTimer}
              playerInfo={playerInfo}
              playerState={playerState}
              gameStatus={gameStatus}
              rules={rules}
              seerMessage={seerMessage}
            />
          </Col>
          <Col className="column whiteCard no-margin">
            <GameButton
              playerInfo={playerInfo}
              gameStatus={gameStatus}
              socket={socket}
              playerState={playerState}
            />
            <Voting
              timer={timer}
              playerInfo={playerInfo}
              currentPhase={currentPhase}
              playerState={playerState}
              gameStatus={gameStatus}
              socket={socket}
            />
          </Col>
          <Col className="column whiteCard">
            <WolfChat
              playerInfo={playerInfo}
              currentPhase={currentPhase}
              playerState={playerState}
              socket={socket}
            />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default GamePage;
