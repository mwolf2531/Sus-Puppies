import React, {useState} from 'react';
import styled from 'styled-components';

const GamePage = () => {

  //Note: These states are not final in anyway.
  const [time, setTime] = useState(0);
  const [centerDisplay, setCenterDisplay] = useState({});
  const [phaseResult, setPhaseResult] = useState(false);
  const [currentDay, setCurrentDay] = useState('day');
  const [gameRules, setGameRules] = useState({});
  const [allPlayerInfo, setAllPlayerInfo] = useState({});
  const [gameLogic, setGameLogic] = useState({});
  const [votingRecord, setVotingRecord] = useState({});

  //TODO: Add Lifecycle methods as needed.



  return (<div>Sus Puppies!</div>)
}