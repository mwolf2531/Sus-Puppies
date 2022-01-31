import React, { useState, useEffect } from 'react';
import Timer from './Timer.jsx';
import Player from './Player.jsx';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';

const PlayerFrame = ({ voting, playerInfo, currentPhase, timer }) => {

  let currentPlayerKey = 1;

  return (
    <>
      <Row id="chat-row" className="set-height">
        <Col xs={2} className="column">
          Left Column
          <Player
            player={playerInfo[0]}
            key={currentPlayerKey}
            index={currentPlayerKey}
            currentPhase={currentPhase}
          />
          {playerInfo
            .slice(16)
            .reverse()
            .map((player, idx) => {
              currentPlayerKey = playerInfo.length;
              currentPlayerKey--;
              return <Player
                player={player}
                key={currentPlayerKey}
                index={currentPlayerKey}
                currentPhase={currentPhase}
              />
            })
          }
        </Col>
        <Col className="column" id="playerFrame-col-2">
          <Row id="playerFrame-top-row">
            Top Row
            {playerInfo
              .slice(1, 6)
              .map((player, idx) => {
                currentPlayerKey++;
                return <Player
                  player={player}
                  key={currentPlayerKey}
                  index={currentPlayerKey}
                  currentPhase={currentPhase}
                />
              })
            }
          </Row>
          <Row id="playerFrame-timer">
            <Timer
              timer={timer}
              currentPhase={currentPhase}
            />
          </Row>
          <Row id="playerFrame-bottom-row">
            Bottom Row
            {playerInfo
              .slice(11, 16)
              .map((player, idx) => {
                currentPlayerKey++;
                return <Player
                  player={player}
                  key={currentPlayerKey}
                  index={currentPlayerKey}
                  currentPhase={currentPhase}
                />
              })
            }
          </Row>
        </Col>
        <Col xs={2} className="column">
          Right Column
            {playerInfo
              .slice(6, 11)
              .map((player, idx) => {
                currentPlayerKey++;
                return <Player
                  player={player}
                  key={currentPlayerKey}
                  currentPhase={currentPhase}
                />
              })
            }
        </Col>
      </Row>
    </>
  )
}

export default PlayerFrame;