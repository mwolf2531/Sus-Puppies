import React, { useState, useEffect } from 'react';
import Styled from 'styled-components';

const Ruleset = ({ wolves }) => {
  // ruleset receiever
  // socket.on('ruleset-feed', object of gamesettings)
  console.log('WOLVES: ', wolves);
  return (
    <div>
      <h3>Rule Set</h3>
      <div>28 Players</div>
      <div>{wolves.number} Werewolves</div>
      <div>Time for voting 2: 00</div>
      <div>No seer / healer</div>
    </div>
  );
};

export default Ruleset;
