import React, { useState, useEffect } from 'react';
// import Styled from 'styled-components';
import { Button } from 'react-bootstrap';
// import DropdownButton from 'react-bootstrap/DropdownButton';
import Select from 'react-select';

const Voting = ({
  timer,
  playerInfo,
  currentPhase,
  playerRoles,
  playerState,
  socket,
  gameStatus,
}) => {
  //need to get playerId through props from GamePage
  const [voteSelection, setVoteSelection] = useState('NULL');
  const [isVoted, setIsVoted] = useState(false);
  const [villagerOptions, setVillagerOptions] = useState([]);
  const [wolfOptions, setWolfOptions] = useState([]);

  // const options = playerInfo
  //   .filter((player) => player.player_id !== playerState.player_id)
  //   .map((player, idx) => {
  //     return { value: player.username, label: player.username }
  //   });

  const logChange = (e) => {
    setVoteSelection(e.value);
  };

  useEffect(() => {

    const villagers = playerInfo
      .filter((player) => player.player_id !== playerState.player_id)
      .filter((player) => player.role % 2 === 0)
      .map((player, idx) => {
        return { value: player.username, label: player.username };
      });

    const wolves = playerInfo
      .filter((player) => player.player_id !== playerState.player_id)
      .filter((player) => player.role % 2 === 0 && player.role !== 2)
      .map((player, idx) => {
        return { value: player.username, label: player.username };
      });
      setVillagerOptions(villagers);
      setWolfOptions(wolves);
    //TODO: add lifecycle method to watch for currentPhase change
  }, [gameStatus]);
  const submitVote = (e) => {
    if (!isVoted) {
      let voteTuple = [playerState.username, voteSelection];
      // On Click of Submit button, create and send tuple of vote values
      // VOTE SENDER
      console.log(voteTuple); //WE KNOW WE MADE IT THIS FAR
      socket?.emit('vote-send', voteTuple);
      setIsVoted(true);
    }
  };
  useEffect(() => {
    if (timer === 0 && gameStatus !== 'setup' && !isVoted) {
      submitVote();
    }
    //TODO: add lifecycle method to watch for cuurentPhase change
    //setIsVoted -> false
  }, [timer]);

  useEffect(() => {
    if (isVoted){
      setIsVoted(false);
    }
  }, [currentPhase]);

  const playerRole =
    playerInfo
      ?.find(player => player?.player_id === playerState?.player_id || null)

  if (currentPhase === 'night' && playerRole === 2) {
    return (
      <>
        <h3>Wolves Vote!</h3>
        <Select className='dropdown'  onChange={logChange} options={wolfOptions}/>
        <div className='game-button'>
          <Button variant='warning' onClick={submitVote}>
            Kill Villager
          </Button>
        </div>
      </>
    );
  } else if (playerRole % 2 === 1) {
    return <div>You're dead. No voting allowed</div>;
  } else if (currentPhase === 'night' && playerState.role !== 2) {
    return <div>Sleep peacefully while the werewolves are about...</div>;
  }

  return (
    <>
      <h3>Everybody Votes!</h3>
      <Select className='dropdown' onChange={logChange} options={villagerOptions}/>
      <div className='game-button'>
        <Button variant='warning' style={{ marginRight: '18px' }}>
          Skip Vote
        </Button>
        <Button variant='secondary' onClick={submitVote} disabled={isVoted}>
          Submit
        </Button>
      </div>
    </>
  );
};

export default Voting;
