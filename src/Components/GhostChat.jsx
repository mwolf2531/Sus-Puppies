import React, { useState, useEffect } from 'react';
// import Styled from 'styled-components';

const GhostChat = (props) => {

  const { socket } = props;

  const [newMessage, setNewMessage] = useState('');
  const [chat, setChat] = useState([]);

  useEffect(() => {
    console.log(chat);
    socket?.on('ghost-chat-feed', (message) => {
      setChat((chat) => [...chat, message]);
    });
  }, [socket]);

  const handleMessageSubmit = (event) => {
    event.preventDefault();
    socket.emit('ghost-chat-send', newMessage);
    setNewMessage('');
  };
  return (
    <div>
      <h3>Ghost Chat</h3>
      {chat.map((msg, i) => (
        <div key={i}>{msg}</div>
      ))}
      <br />
      <div className="chat-message">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => {
            setNewMessage(e.target.value);
          }}
        ></input>
        <button onClick={handleMessageSubmit}>send message</button>
      </div>
    </div>
  );
};

export default GhostChat;
