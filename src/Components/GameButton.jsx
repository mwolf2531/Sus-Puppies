import React, { useState, useEffect } from 'react';
import { Row, Button } from 'react-bootstrap';

const GameButton = ({ playerId, playerInfo, playerState, gameStatus, socket }) => {

  useEffect(() => {
    //TODO: create lifecycle method to watch for gameStatus change
  }, [gameStatus]);

  const handleClickStart = () => {
    socket?.emit('host-send', 'start')
  }
  const handleClickPause = () => {
    socket?.emit('host-send', 'pause')
  }
  const handleClickResume = () => {
    socket?.emit('host-send', 'resume')
  }

  return (
    <div className="game-button" >
      {gameStatus === 'setup' && playerState.host
        ? <Button
            variant="warning"
            onClick={handleClickStart}
            style={{width:"100%", display:"block"}}
          > Start Game </Button>
        : gameStatus === 'setup'
        ? <Button
            variant="warning"
            style={{width:"100%", display:"block"}}
          > Waiting for host to start the game </Button>
        : gameStatus === 'playing'
        ? <Button
            variant="warning"
            onClick={handleClickPause}
            style={{width:"100%", display:"block"}}
          > Pause Game </Button>
        : gameStatus === 'paused'
        ? <Button
            variant="warning"
            onClick={handleClickResume}
            style={{width:"100%", display:"block"}}
          > Resume Game </Button>
        : <Button
            variant="warning"
            style={{width:"100%", display:"block"}}
          > Start New Game </Button>}
    </div >
  )
}

export default GameButton;

