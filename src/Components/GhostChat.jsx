import React, { useState, useEffect } from 'react';
// import Styled from 'styled-components';

const GhostChat = () => {
  const { socket } = props;

  const [newMessage, setNewMessage] = useState('');
  const [chat, setChat] = useState([]);

  useEffect(() => {
    socket?.on('ghost-chat-feed', (message) => {
      setChat((chat) => [...chat, message]);
    });
  }, [socket]);

  const handleMessageSubmit = (event) => {
    event.preventDefault();
    socket.emit('ghost-chat-send', newMessage);
    setNewMessage('');
  };
  //props playerName
  //chatLog from socket.io?
  //watch for change in chatLog
  //functions:
  //chatForm for sending messages
  //clearChatAtEndOfGame
  return (
    <div>
      <h3>Ghost Chat</h3>
      {chat.map((msg, i) => (
        <div key={i}>{msg}</div>
      ))}
      <br />
      <input
              type="text"
              value={newMessage}
              onChange={(e) => {
                setNewMessage(e.target.value);
              }}></input>
      <button onClick={handleMessageSubmit}>send message</button>
    </div>
  )
}

export default GhostChat;
