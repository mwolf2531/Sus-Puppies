import React, { useState, useEffect } from 'react';
import Styled from 'styled-components';
import Dropdown from 'react-bootstrap/Dropdown';

const Voting = () => {
  return (
    <DropdownButton id="dropdown-basic-button" title="Dropdown button">
      <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
      <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
      <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
    </DropdownButton>
    <button type="button">Skip Vote</button>
    <button type="button">Submit</button>
  )
}

export default Voting;



