import React, { useState, useEffect } from 'react';
// import Styled from 'styled-components';

<<<<<<< HEAD
const GhostChat = () => {
  const { socket } = props;
=======
const GhostChat = (props) => {

const { socket } = props;
>>>>>>> de4b5e194e61553aa86f5b7c0e9e67fbbb52a7ed

  const [newMessage, setNewMessage] = useState('');
  const [chat, setChat] = useState([]);

  useEffect(() => {
<<<<<<< HEAD
=======
    console.log(chat);
>>>>>>> de4b5e194e61553aa86f5b7c0e9e67fbbb52a7ed
    socket?.on('ghost-chat-feed', (message) => {
      setChat((chat) => [...chat, message]);
    });
  }, [socket]);

  const handleMessageSubmit = (event) => {
    event.preventDefault();
    socket.emit('ghost-chat-send', newMessage);
    setNewMessage('');
  };
<<<<<<< HEAD
  //props playerName
  //chatLog from socket.io?
  //watch for change in chatLog
  //functions:
  //chatForm for sending messages
  //clearChatAtEndOfGame
=======

>>>>>>> de4b5e194e61553aa86f5b7c0e9e67fbbb52a7ed
  return (
    <div>
      <h3>Ghost Chat</h3>
      {chat.map((msg, i) => (
        <div key={i}>{msg}</div>
      ))}
      <br />
      <input
<<<<<<< HEAD
              type="text"
              value={newMessage}
              onChange={(e) => {
                setNewMessage(e.target.value);
              }}></input>
=======
        type="text"
        value={newMessage}
        onChange={(e) => {
          setNewMessage(e.target.value);
        }}
      ></input>
>>>>>>> de4b5e194e61553aa86f5b7c0e9e67fbbb52a7ed
      <button onClick={handleMessageSubmit}>send message</button>
    </div>
  );
};

export default GhostChat;
