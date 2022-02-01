import React, { useState, useEffect } from 'react';
import Styled from 'styled-components';
import { Button } from 'react-bootstrap';
// import DropdownButton from 'react-bootstrap/DropdownButton';
import Select from 'react-select';

const Voting = ({ timer, playerInfo, currentPhase, playerRoles, playerState, socket }) => {
  //need to get playerId through props from GamePage
  console.log('compPInfo', playerInfo);
  const [voteSelection, setVoteSelection] = useState(null);

  const options = playerInfo
    .filter((player) => player.player_id !== playerState.player_id)
    .map((player, idx) => {
      return { value: player.username, label: player.username }
    });

  const logChange = (e) => {
    setVoteSelection(e.value);
  }

  useEffect(() => {
    //TODO: add lifecycle method to watch for cuurentPhase change
  }, [currentPhase]);

  const submitVote = (e) => {
    //TODO
    let voteTuple = [playerState.username, e.value];
    // On Click of Submit button, create and send tuple of vote values
    // VOTE SENDER
    socket.emit('vote-send', voteTuple);
  };

  return (
    <>
      {/* <DropdownButton id="dropdown-basic-button" title="Dropdown button">
        {playerInfo
          .filter((player) => player.player_id !== playerId)
          .map((player, idx) => {
            return (
              <Dropdown.Item href="#" key={idx}>
                {player.name}
              </Dropdown.Item>
            );
          })}
      </DropdownButton> */}
      <h3>Voting</h3>
      <Select
        className="dropdown"
        options={options}
        onChange={submitVote}
      />
      <div className="game-button">
        <Button variant="warning" style={{ marginRight: "18px" }}>Skip Vote</Button>{' '}
        <Button variant="secondary">Submit</Button>{' '}
        {/* submit button will have submitVote functionality
        state to track submitted status
        disable button if submitted is true */}
      </div>
    </>
  );
};

export default Voting;
