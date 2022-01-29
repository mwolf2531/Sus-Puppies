import React from 'react';

const Header = ({props:{message, currentDay}}) => {
  return (
    <div>
      <div>Sus Puppies!</div>
      <div>{message}</div>
      <div>{currentDay}</div>
    </div>
  )
}

export default Header;