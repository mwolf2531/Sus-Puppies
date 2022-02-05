import React, { useState, useEffect } from 'react';
import Timer from './Timer.jsx';
import Player from './Player.jsx';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';

const PlayerFrame = ({ playerInfo, currentPhase, timer }) => {

  let currentPlayerKey = 1;

  return (
    <>
      <div className="wrapper">
        {playerInfo
          .map((player, idx) => {
            currentPlayerKey++;
            return (
              <Player
                player={player}
                currentPhase={currentPhase}
                playerInfo={playerInfo}
                key={currentPlayerKey}
              />
            )
          })
        }
        <div className="item1" id="playerFrame-timer">
          <Timer
            timer={timer}
            currentPhase={currentPhase}
          />
        </div>
      </div>
    </>
  )
}

export default PlayerFrame;
