import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { GiSquare, GiCheckMark, GiHelp, GiWerewolf, GiWolfHead, GiWolfHowl, GiMedicalPackAlt, GiMedicalPack, GiHeartPlus, GiAllSeeingEye, GiBleedingEye, GiSemiClosedEye, GiSheikahEye, FcAssistant, FcBusinessman, FcBusinesswoman, FcCustomerSupport, FcPortraitMode, FcReuse, FcSportsMode, FcVoicePresentation, FcSelfie, FcPodiumWithSpeaker } from 'react-icons/gi';

const Player = ({ player, currentPhase, number }) => {
  const icons = [<GiSquare />, <GiCheckMark />, <GiHelp />, <GiWerewolf />, <GiWolfHead />, <GiWolfHowl />, <GiMedicalPackAlt />, <GiMedicalPack />, <GiHeartPlus />, <GiAllSeeingEye />, <GiBleedingEye />, <GiSemiClosedEye />, <GiSheikahEye />];

  // const pictures = [<FcAssistant />, <FcBusinessman />, <FcBusinesswoman />, <FcCustomerSupport />, <FcPortraitMode />, <FcReuse />, <FcSportsMode />, <FcVoicePresentation />, <FcSelfie />, <FcPodiumWithSpeaker />]

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
      <div onClick={handleClick}>
        {currentIcon}
      </div>
      <div>
        {/* TODO: need to render player icon according to its format */}
        {/* {pictures[number]} */}
      </div>
    </div>
  )
}

export default Player;
