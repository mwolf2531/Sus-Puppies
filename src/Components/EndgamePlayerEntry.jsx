import React, { useState, useEffect } from 'react';
import { GiCheckMark, GiWolfHowl, GiHeartPlus, GiBleedingEye } from 'react-icons/gi';

const roleIcons = [
  <GiCheckMark size={25} style={{ marginLeft: "-25px", zIndex: "-1", paddingBottom: "5px" }} />,
  <GiWolfHowl size={25} style={{ marginLeft: "-25px", zIndex: "-1", paddingBottom: "5px" }} />,
  <GiHeartPlus size={25} style={{ marginLeft: "-25px", zIndex: "-1", paddingBottom: "5px" }} />,
  <GiBleedingEye size={25} style={{ marginLeft: "-25px", zIndex: "-1", paddingBottom: "5px" }} />
];

const EndgamePlayerEntry = ({ player }) => {
  if (player.role % 2 === 0) {
    return (
      <span>
        {roleIcons[Math.floor(player.role / 2)]}
        &nbsp;{player.username}
      </span>
    )
  } else {
    <span style={{textDecorationLine: 'line-through', textDecorationStyle: 'solid'}}>
      {roleIcons[Math.floor(player.role / 2)]}
      &nbsp;{player.username}
    </span>
  }
}

export default EndgamePlayerEntry;