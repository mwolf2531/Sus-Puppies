import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Button, Form, InputGroup } from 'react-bootstrap';

const WolfChat = ({
  socket,
  playerState,
  playerId,
  playerInfo,
  playerRoles,
  currentPhase,
}) => {
  const [newMessage, setNewMessage] = useState('');
  const [chat, setChat] = useState([]);

  useEffect(() => {
    console.log(chat);
    socket?.on('wolf-chat-feed', (message) => {
      setChat((chat) => [...chat, message]);
    });
  }, [socket]);

  useEffect(() => {
    setChat([]);
  }, [currentPhase]);

  const handleMessageSubmit = (event) => {
    if (newMessage.length > 0) {
      event.preventDefault();
      let messageObject = {
        username: playerState.username,
        message: newMessage,
      };
      socket.emit('wolf-chat-send', messageObject);
      setNewMessage('');
    }
  };

  return (
    <Container>
      <h3>Wolf Chat</h3>
      <Chat>
        {chat.map((msg, i) => {
          if (msg.username !== playerState.username) {
            return (
              <ChatBox key={i}>
                <Username>{msg.username} </Username>
                <Message>{msg.message} </Message>
              </ChatBox>
            );
          } else {
            return (
              <UserBox key={i}>
                <Username>{msg.username} </Username>
                <Message>{msg.message} </Message>
              </UserBox>
            );
          }
        })}
      </Chat>
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
          <Button variant="warning" onClick={handleMessageSubmit}>
            Send
          </Button>{' '}
        </InputGroup>
      </div>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Chat = styled.div`
  display: flex;
  flex-direction: column;
  color: #000000;
  max-height: 180px;
  min-height: 180px;
  overflow: auto;
`;

const ChatBox = styled.div`
  display: flex;
  flex-direction: column;
  background: #ffffff;
  border-radius: 30px;
  margin-right: auto;
  margin-top: 3px;
  margin-bottom: 3px;
  max-width: 60%;
  min-width: 10%;
  padding: 5px 20px;
  overflow-wrap: break-word;
`;

const UserBox = styled.div`
  display: flex;
  flex-direction: column;
  background: #ffde6a;
  border-radius: 30px;
  margin-left: auto;
  margin-top: 3px;
  margin-bottom: 3px;
  max-width: 60%;
  min-width: 10%;
  padding: 5px 20px;
  overflow-wrap: break-word;
`;

const Username = styled.div`
  font-weight: bold;
  font-size: 13px;
`;

const Message = styled.div``;

export default WolfChat;
