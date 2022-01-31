import React from 'react';
import logo from '../../public/images/logo.svg';

const Header = ({ currentPhase, currentDay, previousResult }) => {

  return (
    <div>
      <span>
        <img src={logo} style={{height:"10vh"}} />
      </span>
      <span style={{display:"flex", justifyContent: "left"}}>Sus Puppies! </span>
      <span style={{display:"flex", justifyContent: "center"}}>{previousResult} </span>
      <span style={{display:"flex", justifyContent: "right"}}>{currentPhase} {currentDay}</span>
    </div>
  )
}

export default Header;
