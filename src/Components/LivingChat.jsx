import React, { useState, useEffect } from 'react';
// import Styled from 'styled-components';

const LivingChat = (props) => {
  const { socket } = props;

  const [newMessage, setNewMessage] = useState('');
  const [chat, setChat] = useState([]);

  useEffect(() => {
    console.log(chat);
    socket?.on('living-chat-feed', (message) => {
      setChat((chat) => [...chat, message]);
    });
  }, [socket]);

  const handleMessageSubmit = (event) => {
    event.preventDefault();
    socket.emit('living-chat-send', newMessage);
    setNewMessage('');
  };

  return (
    <div>
      <h3>Living Chat</h3>
      {chat.map((msg, i) => (
        <div key={i}>{msg}</div>
      ))}
      {/* <div>
        <b>player1:</b> sup?
      </div>
      <div>
        <b>player2:</b> who dunnit?
      </div>
      <div>
        <b>player11:</b> it was me
      </div>
      <div>
        <b>player5:</b> vote for player11!
      </div>
      <div>
        <b>player3:</b> I think it was player5
      </div>
      <div>
        <b>player8:</b> player5 sus
      </div> */}
      <br />
      <input
        type="text"
        value={newMessage}
        onChange={(e) => {
          setNewMessage(e.target.value);
        }}
      ></input>
      <button onClick={handleMessageSubmit}>send message</button>
    </div>
  );
};

export default LivingChat;
