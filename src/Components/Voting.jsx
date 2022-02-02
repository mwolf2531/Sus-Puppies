import React, { useState, useEffect } from 'react';
import Styled from 'styled-components';
import { Button } from 'react-bootstrap';
// import DropdownButton from 'react-bootstrap/DropdownButton';
import Select from 'react-select';

const Voting = ({ timer, playerInfo, currentPhase, playerRoles, playerState, socket, gameStatus }) => {
  //need to get playerId through props from GamePage

  console.log('compPInfo', playerInfo);
  const [voteSelection, setVoteSelection] = useState('NULL');
  const [isVoted, setIsVoted] = useState(false)


  const logChange = (e) => {
    setVoteSelection(e.value);
  }


  const villagerOptions = playerInfo
    .filter(player => player.player_id !== playerState.player_id)
    .filter(player => player.role % 2 === 0)
    .map((player, idx) => {
      return { value: player.username, label: player.username }
    });



  const wolfOptions = playerInfo
    .filter(player => player.player_id !== playerState.player_id)
    .filter(player => player.role % 2 === 0 && player.role !== 2)
    .map((player, idx) => {
      return { value: player.username, label: player.username }
    });

  useEffect(() => {
    //TODO: add lifecycle method to watch for currentPhase change
  }, [currentPhase]);
  const submitVote = (e) => {
    let voteTuple = [playerState.username, voteSelection];
    // On Click of Submit button, create and send tuple of vote values
    // VOTE SENDER
    console.log(voteTuple)
    socket?.emit('vote-send', voteTuple);
    setIsVoted(true);
  };
  useEffect(() => {
    if (timer === 0 && gameStatus !== 'setup') {
      submitVote();
    }
    //TODO: add lifecycle method to watch for cuurentPhase change
    //setIsVoted -> false
  }, [currentPhase, timer]);


  let defaultView = (
    <>
      <h3>Voting</h3>
      <Select
        className="dropdown"
        villagerOptions={villagerOptions}
        onChange={logChange}
      />
      <div className="game-button">
        <Button variant="warning" style={{ marginRight: "18px" }}>Skip Vote</Button>{' '}
        <Button variant="secondary" onClick={submitVote} disabled={isVoted}>Submit</Button>{' '}
        {/* submit button will have submitVote functionality
        state to track submitted status
        disable button if submitted is true */}
      </div>
    </>
  )
  if (currentPhase === 'night' && playerState.role === 2) {
    defaultView = (
      <>
        <h3>Voting</h3>
        <Select
          className="dropdown"
          villagerOptions={wolfOptions}
          onChange={logChange}
        />
        <div className="game-button">
          <Button variant="warning" onClick={submitVote}>Kill Villager</Button>
        </div>
      </>
    )
  } else if (playerState.role % 2 === 1) {
    defaultView = (
      <div>You're dead. No voting allowed</div>
    )
  } else if (currentPhase === 'night' && playerState.role !== 2) {
    defaultView = (
      <div>Sleep peacefully while the werewolves are about...</div>
    )
  }

  return defaultView;
};

export default Voting;
