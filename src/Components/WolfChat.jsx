import React, { useState, useEffect } from 'react';
import Styled from 'styled-components';

const WolfChat = () => {
  return (
    <div>
      <h3>Werewolf Chat</h3>
      <div><b>player5:</b> let's kill</div>
      <div><b>player3:</b> who?</div>
      <div><b>player12:</b> player8</div>
      <div><b>player5:</b> I agree</div>
      <div><b>player6:</b> player8 it is</div>
      <br />
      <input type="text"></input>
      <button>send message</button>
    </div>
  )
}

export default WolfChat;


