import React, { useState, useEffect } from 'react';

const GameButton = ({ playerId, playerInfo, gameStatus }) => {

  useEffect(() => {
    //TODO: create lifecycle method to watch for gameStatus change
  }, [gameStatus]);

  return (
    <div>
      {/* TODO: find out how to match playerId to check if player is host */}
      {gameStatus === 'setup'
      ? <button>Start Game</button>
      : gameStatus === 'playing'
      ? <button>Pause Game</button>
      : gameStatus === 'paused'
      ? <button>Resume Game</button>
      : <button>Play Again</button>}
    </div>
  )
}

export default GameButton;
