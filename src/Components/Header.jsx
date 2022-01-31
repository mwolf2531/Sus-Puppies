import React from 'react';
import logo from '../../public/images/logo.svg';

const Header = ({ currentPhase, currentDay, previousResult }) => {

  return (
    <div>
      <span style={{position:"absolute", right: "94.5%"}}>
        <img src={logo} style={{height:"7vh"}} />
      </span>
      <span style={{position:"absolute", right: "50%", top: "3%", fontSize:"2vh", color:"red"}}>{previousResult} </span>
      <span style={{position:"absolute", right: "5%", top: "3%", fontSize:"2vh"}}>{currentPhase} {currentDay}</span>
    </div>
  )
}

export default Header;
