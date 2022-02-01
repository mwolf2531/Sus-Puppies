import React, { useState, useEffect } from 'react';
import { Row, Button } from 'react-bootstrap';

const GameButton = ({ playerId, playerInfo, gameStatus, socket }) => {

  useEffect(() => {
    //TODO: create lifecycle method to watch for gameStatus change
  }, [gameStatus]);

  const handleClick = () => {
    socket?.emit('host-send', 'start')
  }

  return (
    <div className="game-button" >
      <Button variant="warning" style={{ marginRight: "18px" }}>Pause Game</Button>{' '}
      <Button variant="secondary" onClick={handleClick} >Start Game</Button>{' '}
    </div >
  )
}

export default GameButton;


{/* TODO: find out how to match playerId to check if player is host */ }
{/* {gameStatus === 'setup'
            ? <button>Start Game</button>
            : gameStatus === 'playing'
              ? <button>Pause Game</button>
              : gameStatus === 'paused'
                ? <button>Resume Game</button>
                : <button>Play Again</button>} */}
