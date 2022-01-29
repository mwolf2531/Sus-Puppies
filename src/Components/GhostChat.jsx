import React, { useState, useEffect } from 'react';
// import Styled from 'styled-components';

const GhostChat = () => {
  //props playerName
  //chatLog from socket.io?
  //watch for change in chatLog
  //functions:
    //chatForm for sending messages
    //clearChatAtEndOfGame
  return (
    <div>
      <h3>Ghost Chat</h3>
      <div><b>player1:</b> are we ded?</div>
      <div><b>player2:</b> i think so</div>
      <div><b>player11:</b> how?</div>
      <div><b>player5:</b> you were lynched</div>
      <br />
      <input>type your message here...</input>
      <button>send message</button>
    </div>
  )
}

export default GhostChat;
