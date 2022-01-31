import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { GiSquare, GiCheckMark, GiHelp, GiWerewolf, GiWolfHead, GiWolfHowl, GiMedicalPackAlt, GiMedicalPack, GiHeartPlus, GiAllSeeingEye, GiBleedingEye, GiSemiClosedEye, GiSheikahEye} from 'react-icons/gi';
import werewolf from '../../public/images/werewolf.png';

const Player = ({ player, currentPhase, number }) => {
  const icons = [<GiSquare />, <GiCheckMark />, <GiHelp />, <GiWerewolf />, <GiWolfHead />, <GiWolfHowl />, <GiMedicalPackAlt />, <GiMedicalPack />, <GiHeartPlus />, <GiAllSeeingEye />, <GiBleedingEye />, <GiSemiClosedEye />, <GiSheikahEye />];

  const [index, setIndex] = useState(0);
  const [currentIcon, setCurrentIcon] = useState(icons[index]);

  const handleClick = () => {
    setIndex(index + 1)
    setCurrentIcon(icons[index]);
  }

  useEffect(() => {
    setIndex(0)
    setCurrentIcon(icons[index]);
  }, [currentPhase])

  return (
    <div>
      {player === undefined
      ? <h5>Player Name</h5>
      : <h5>{player.name}</h5>
      }
      <span onClick={handleClick} style={{height:"4vh"}}>
        {currentIcon}
      </span>
      <div>
        {/* TODO: need to render player icon according to its format */}
        <img src={werewolf} style={{height:"7vh"}} />
      </div>
    </div>
  )
}

export default Player;
