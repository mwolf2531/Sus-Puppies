import React, { useState, useEffect } from 'react';
import Styled from 'styled-components';

const Ruleset = (/* needs game logic object */) => {
  // ruleset receiever
  // socket.on('ruleset-feed', object of gamesettings)

  return (
    <div>
      <h3>Rule Set</h3>
      <div>28 Players</div>
      <div>5 Werewolves</div>
      <div>Time for voting 2: 00</div>
      <div>No seer / healer</div>
    </div>
  );
};

export default Ruleset;
