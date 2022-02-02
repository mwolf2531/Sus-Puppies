import React from 'react';
import logo from '../../public/images/logo.svg';
import werewolf from '../../public/images/werewolf.svg';
import werewolfTitle from '../../public/images/werewolf-title.svg';

const Header = ({ currentPhase, currentDay, previousResult }) => {

  return (
    <div>
      <span style={{display : 'inline-block'}}>
        <img src={werewolf} style={{height:"8vh"}} />
      </span>
      <span style={{display : 'inline-block', marginTop: "-100px"}}>
        <img src={werewolfTitle} style={{height:"20vh"}} />
      </span>
      <span style={{position:"absolute", right: "50%", top: "3%", fontSize:"2vh", color:"red"}}>{previousResult} </span>
      <span style={{position:"absolute", right: "5%", top: "3%", fontSize:"2vh"}}>{currentPhase} {currentDay}</span>
    </div>
  )
}

export default Header;
