import React, { useState, useEffect } from 'react';
// import Styled from 'styled-components';
import { Button, Form, InputGroup } from 'react-bootstrap';

const LivingChat = ({ socket, playerInfo, playerId, playerState }) => {
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
    let messageObject = { username: playerState.username, message: newMessage };
    socket.emit('living-chat-send', messageObject);
    setNewMessage('');
  };

  return (
    <div>
      <h3>Living Chat</h3>
      {chat.map((msg, i) => (
        <div className="chatblock" key={i}>
          <div className="username">{msg.username} </div>
          <div className="message">{msg.message} </div>
        </div>
      ))}
      <br />
      <div className="chat-message">
        <InputGroup>
          <Form.Control
            type="text"
            placeholder="Message.."
            value={newMessage}
            onChange={(e) => {
              setNewMessage(e.target.value);
            }}
          />
          <Button variant="warning" onClick={handleMessageSubmit}>
            Send
          </Button>{' '}
        </InputGroup>
      </div>
    </div>
  );
};

export default LivingChat;
