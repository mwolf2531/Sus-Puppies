import React, { useState, useEffect } from 'react';
import Timer from './Timer.jsx';
import Player from './Player.jsx';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';

const PlayerFrame = ({ voting, playerInfo, currentPhase, timer }) => {

  let currentPlayerKey = 1;

  return (
    <div>
      <Row id="chat-row">
        <Col id="column">
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
        <Col id="column">
          <Row>
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
          <Row>
            <Timer
              timer={timer}
              currentPhase={currentPhase}
            />
          </Row>
          <Row>
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
        <Col id="column">
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
    </div>
  )
}

export default PlayerFrame;