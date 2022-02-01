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

import { io } from 'socket.io-client';

const GamePage = () => {
  //Note: These states are not final in anyway.
  const [timer, setTimer] = useState(0);
  const [previousResult, setPreviousResult] = useState('Welcome to Day 0!');
  const [currentDay, setCurrentDay] = useState(0);
  const [currentPhase, setCurrentPhase] = useState('');
  // const [playerRoles, setPlayerRoles] = useState([]);
  const [votes, setVotes] = useState([]);
  const [gameStatus, setGameStatus] = useState('not started');
  const [phaseResults, setPhaseResults] = useState([]);
  const [playerInfo, setPlayerInfo] = useState([]);
  // const [ghostChats, setGhostChats] = useState([]);
  // const [livingChats, setLivingChats] = useState([]);
  // const [wolfChats, setWolfChats] = useState([]);
  const [host, setHost] = useState('');
  // const [playerId, setPlayerId] = useState('');
  const [playerState, setPlayerState] = useState({});

  const [socket, setSocket] = useState(null);

  useEffect(() => {
    setSocket(io('ws://localhost:8900'));
    // setTimer(data.gameState.timer);
    // setPreviousResult(data.gameState.previousResult);
    // setCurrentDay(data.gameState.currentDay);
    // setCurrentPhase(data.gameState.currentPhase);
    // setPlayerRoles(data.gameState.playerRoles);
    // setVoting(data.gameState.voting);
    // setGameStatus(data.gameState.gameStatus);
    // setPhaseResults(data.gameState.phaseResults);
    // setPlayerInfo(data.gameState.playerInfo);
    // setGhostChats(data.gameState.ghostChats);
    // setLivingChats(data.gameState.livingChats);
    // setWolfChats(data.gameState.wolfChats);
    // setHost(data.gameState.host);
    // setPlayerId(data.playerState.player_id);
    // setPlayerState(data.playerState);
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
    socket?.on('playerState-feed', (playerStateObject) => {
      setPlayerState(playerStateObject);
      // setPlayerId(playerStateObject.player_id);
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
        wolves,
      }) => {
        setTimer(timer);
        setPreviousResult(previousResult);
        setCurrentDay(currentDay);
        setCurrentPhase(currentPhase);
        setPhaseResults(phaseResults);
        setPlayerInfo(playerInfo);
        setGameStatus(gameStatus);
      }
    );

    // socket?.on('gameStatus', (string) => {
    //   // TODO: update gameStatus
    // });
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
              // livingChats={livingChats}
              currentPhase={currentPhase}
              playerInfo={playerInfo}
              // playerId={playerId}
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
              // ghostChats={ghostChats}
              playerInfo={playerInfo}
              // playerId={playerId}
              playerState={playerState}
              // playerRoles={playerRoles}
              socket={socket}
            />
          </Col>
        </Row>
        <Row id="bottom-row">
          <Col className="column whiteCard">
            <Ruleset
            /* gameLogic object containing game-specific rules (# of wolves, etc) */
            />
          </Col>
          <Col className="column whiteCard no-margin">
            <GameButton
              // playerId={playerId}
              playerInfo={playerInfo}
              gameStatus={gameStatus}
              socket={socket}
            />
            <Voting
              timer={timer}
              playerInfo={playerInfo}
              currentPhase={currentPhase}
              playerState={playerState}
              // playerRoles={playerRoles}
              socket={socket}
            />
          </Col>
          <Col className="column whiteCard">
            <WolfChat
              // wolfChats={wolfChats}
              playerInfo={playerInfo}
              // playerId={playerId}
              // playerRoles={playerRoles}
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
