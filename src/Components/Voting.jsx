import React, { useState, useEffect } from 'react';
import Styled from 'styled-components';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

const Voting = ({ timer, playerInfo, currentPhase, playerRoles, playerId }) => {
  //need to get playerId through props from GamePage
  const [voteSelection, setVoteSelection] = useState(null);

  useEffect(() => {
    //TODO: add lifecycle method to watch for cuurentPhase change
  }, [currentPhase])

  const submitVote = () => {
    //EITHER:
    //TODO: send voteSelection to handleVoting function in GamePage
    //OR
    //TODO: send voteSelection directly to server
  }

  return (
    <>
      <DropdownButton id="dropdown-basic-button" title="Dropdown button">
        {playerInfo
          .filter(player => player.player_id !== playerId)
          .map((player, idx) => {
            return <Dropdown.Item href="#/action-1" key={idx} >{player.name}</Dropdown.Item>}
          )
        }
      </DropdownButton>
      <button type="button">Skip Vote</button>
      <button type="button">Submit</button>
    </>
  )
}

export default Voting;



