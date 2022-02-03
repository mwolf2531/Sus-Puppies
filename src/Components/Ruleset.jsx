import React, { useState, useEffect } from 'react';
import Styled from 'styled-components';

const Ruleset = ({ wolves, initialTimer, playerInfo, playerState, gameStatus, rules, seerMessage }) => {
  // ruleset receiever
  // socket.on('ruleset-feed', object of gamesettings)

  const roleDefinitions = ['Villager', 'Dead Villager', 'Werewolf', 'Dead Werewolf', 'Seer', 'Dead Seer', 'Healer', 'Dead Healer'];
  const player =
    playerInfo
      ?.find(player => player?.player_id === playerState?.player_id || null)


  return (
    <div>
      <h2>Hello {playerState?.username}!</h2>
      <h3>Ruleset</h3>
      <div>{playerInfo?.length} Players</div>
      <div>{rules.numWolves} Werewolves</div>
      <div>{rules.timer} seconds per round</div>
      <div>Seer {rules.seer ? 'ON' : 'OFF'}</div>
      <div>Healer {rules.healer ? 'ON' : 'OFF'}</div>
      <br />
      {gameStatus === 'setup'
      ? <div>Your role has not been assigned yet...</div>
      : <div><b>You are a {roleDefinitions[player?.role || 0]}</b></div>
      }
      {player?.role === 4
      ? <div>{seerMessage}</div>
      : null
      }
    </div>
  );
};

export default Ruleset;

