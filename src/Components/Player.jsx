import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { GiSquare, GiCheckMark, GiHelp, GiWolfHowl, GiHeartPlus, GiBleedingEye} from 'react-icons/gi';
import werewolf from '../../public/images/werewolf.png';
import s1 from '../../public/images/1.svg';

const Player = ({ player, currentPhase, number }) => {
  const icons = [<GiSquare />, <GiCheckMark />, <GiHelp />, <GiWolfHowl />, <GiHeartPlus />, <GiBleedingEye />];

  const [index, setIndex] = useState(0);
  const [currentIcon, setCurrentIcon] = useState(icons[index]);

  const handleClick = () => {
    index === icons.length - 1 ? setIndex(0) : setIndex(index + 1);
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
        <img src={s1} style={{height:"7vh", backgroundColor:"white", borderRadius:'1em'}} />
      </div>
    </div>
  )
}

export default Player;
