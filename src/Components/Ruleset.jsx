import React, { useState, useEffect } from 'react';
import Styled from 'styled-components';

const Ruleset = ({ wolves, initialTimer, playerInfo, playerState }) => {
  // ruleset receiever
  // socket.on('ruleset-feed', object of gamesettings)

  const roleDefinitions = ['Villager', 'Dead Villager', 'Werewolf', 'Dead Werewolf'];
  const player =
    playerInfo
      ?.find(player => player?.player_id === playerState?.player_id || null)


  return (
    <div>
      <h2>Hello {playerState?.username}!</h2>
      <h3>Ruleset</h3>
      <div>{playerInfo?.length} Players</div>
      <div>{wolves} Werewolves</div>
      <div>{initialTimer} seconds per round</div>
      <br />
      <div><b>You are a {roleDefinitions[player?.role || 0]}</b></div>
    </div>
  );
};

export default Ruleset;

