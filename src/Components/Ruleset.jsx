import React, { useState, useEffect } from 'react';
import Styled from 'styled-components';

const Ruleset = ({ wolves, initialTimer, playerInfo, playerState }) => {
  // ruleset receiever
  // socket.on('ruleset-feed', object of gamesettings)
<<<<<<< HEAD
<<<<<<< HEAD

  const roleDefinitions = ['Villager', 'Dead Villager', 'Werewolf', 'Dead Werewolf'];

  const playerRole =
    playerInfo
      .find(player => player.player_id === playerState.player_id)



=======
>>>>>>> 04fde4002d9a840155785e57e4f38302d2bb2264
=======
>>>>>>> c94d56b342287a2792a8e585df3febf69eb0ae04
  return (
    <div>
      <h3>Ruleset</h3>
      <div>{playerInfo.length} Players</div>
      <div>{wolves} Werewolves</div>
      <div>{initialTimer} seconds per round</div>
      <br />
      <div><b>You are a {roleDefinitions[playerRole?.role || 0]}</b></div>
    </div>
  );
};

export default Ruleset;

