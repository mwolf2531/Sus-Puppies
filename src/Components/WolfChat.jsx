import React, { useState, useEffect } from 'react';
import Styled from 'styled-components';
import { Button, Form, InputGroup } from 'react-bootstrap';

const WolfChat = (props) => {
  const { socket } = props;

  const [newMessage, setNewMessage] = useState('');
  const [chat, setChat] = useState([]);

  useEffect(() => {
    console.log(chat);
    socket?.on('wolf-chat-feed', (message) => {
      setChat((chat) => [...chat, message]);
    });
  }, [socket]);

  const handleMessageSubmit = (event) => {
    event.preventDefault();
    socket.emit('wolf-chat-send', newMessage);
    setNewMessage('');
  };

  return (
    <div>
      <h3>Wolf Chat</h3>
      {chat.map((msg, i) => (
        <div key={i}>{msg}</div>
      ))}
      <br />
      <div className="wolf-chat-message">
        <InputGroup>
          <Form.Control
            type="text"
            placeholder="Message.."
            value={newMessage}
            onChange={(e) => {
              setNewMessage(e.target.value);
            }}
          />
          <Button variant="warning" onClick={handleMessageSubmit}>Send</Button>{' '}
        </InputGroup>
      </div>
    </div>
  );
}
export default WolfChat;


