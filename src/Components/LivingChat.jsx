import React, { useState, useEffect } from 'react';
// import Styled from 'styled-components';
import {writeUserData, updateChat} from '../test.js';
import {
  getDatabase,
  ref,
  set,
  onValue,
  push,
  update,
  child,
} from 'firebase/database';
const LivingChat = ({props}) => {
  let data = props;
  const [nameTest, setNameTest] = useState('');
  const [log, setLog] = useState({});
  const [chat, setChat] = useState('');

  onValue(updateChat, (snapshot) => {
    const data = snapshot.val();
    console.log('from updateChat: ', data.email);
    if (chat !== data.email){
      setChat(data.email);
    }
  });
  // useEffect(() => {
  //   console.log('----', props)
  //   setLog(props);
  //   // return () => {
  //   //   // Clean up the subscription
  //   //   subscription.unsubscribe();
  //   // };
  // }, [props]);
  // const data = props.email;

  console.log('From Living Chat Component: ', props, 'this has to run');
  return (
    <div>
      <h3>Living Chat</h3>
      <div><b>player1:</b> sup?</div>
      <div><b>player2:</b> who dunnit?</div>
      <div><b>player11:</b> it was me</div>
      <div><b>player5:</b> vote for player11!</div>
      <div><b>player3:</b> I think it was player5</div>
      <div><b>player8:</b> player5 sus</div>
      <div>{chat}</div>
      <br />
      <input value={nameTest} onChange={(e) =>{
        e.preventDefault();
        setNameTest(e.target.value);
      }}></input>
      <button onClick={(e) => {
        e.preventDefault();
        writeUserData(nameTest)
      }}>send message</button>
      <div>{`${JSON.stringify(log)}`}</div>
    </div>
  )
}

export  {LivingChat};