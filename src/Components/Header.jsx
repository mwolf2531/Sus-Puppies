import React from 'react';

const Header = ({ currentPhase, currentDay, previousResult }) => {
  return (
    <div>
      <span>Sus Puppies!</span>
      <span>{previousResult}</span>
      <span>{currentPhase}</span>
      <span>{currentDay}</span>
    </div>
  )
}

export default Header;