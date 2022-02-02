import React, { useState, useEffect } from 'react';
import Styled from 'styled-components';

const Ruleset = ({ wolves, initialTimer, playerInfo }) => {
  // ruleset receiever
  // socket.on('ruleset-feed', object of gamesettings)

  console.log('WOLVES: ', wolves);
  return (
    <div>
      <h3>Ruleset</h3>
      <div>{playerInfo.length} Players</div>
      <div>{wolves} Werewolves</div>
      <div>{initialTimer} seconds per round</div>
    </div>
  );
};

export default Ruleset;
