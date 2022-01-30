import React, { useState, useEffect } from 'react';
// import Styled from 'styled-components';
import cb from '../test.js';
const LivingChat = () => {
  const [nameTest, setNameTest] = useState('');
  return (
    <div>
      <h3>Living Chat</h3>
      <div><b>player1:</b> sup?</div>
      <div><b>player2:</b> who dunnit?</div>
      <div><b>player11:</b> it was me</div>
      <div><b>player5:</b> vote for player11!</div>
      <div><b>player3:</b> I think it was player5</div>
      <div><b>player8:</b> player5 sus</div>
      <br />
      <input value={nameTest} onChange={(e) =>{
        e.preventDefault();
        setNameTest(e.target.value);
      }}></input>
      <button onClick={(e) => {
        e.preventDefault();
        cb(nameTest)
      }}>send message</button>
    </div>
  )
}

export default LivingChat;
