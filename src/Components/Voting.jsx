import React, { useState, useEffect } from 'react';
import Styled from 'styled-components';
import { Button } from 'react-bootstrap';
// import DropdownButton from 'react-bootstrap/DropdownButton';
import Select from 'react-select';

const Voting = ({ timer, playerInfo, currentPhase, playerRoles, playerId }) => {
  //need to get playerId through props from GamePage
  const [voteSelection, setVoteSelection] = useState(null);

  const options = playerInfo
    .filter((player) => player.player_id !== playerId)
    .map((player, idx) => {
      return { value: player.name, label: player.name }
    });

  const logChange = (val) => {
    setVoteSelection(val.value);
  }

  useEffect(() => {
    //TODO: add lifecycle method to watch for cuurentPhase change
  }, [currentPhase]);

  const submitVote = () => {
    //EITHER:
    //TODO: send voteSelection to handleVoting function in GamePage
    //OR
    //TODO: send voteSelection directly to server
    // VOTE SENDER
    // socket.emit('vote-send', voteObjectOrArray);
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
        onChange={logChange}
      />
      <div className="game-button">
        <Button variant="warning" style={{ marginRight: "18px" }}>Skip Vote</Button>{' '}
        <Button variant="secondary">Submit</Button>{' '}
      </div>
    </>
  );
};

export default Voting;
