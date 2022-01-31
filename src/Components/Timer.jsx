import React, { useState, useEffect } from 'react';
import Styled from 'styled-components';
import { GlobalStyles, SectionHeader } from '../../public/sharedStyles.js';
// const sun = './images/sun.png';
// const moon = './images/moon.png';
// const arrow = './images/arrow.png';
import sun from '../../public/images/sun.png';
import moon from '../../public/images/moon.png';
import arrow from '../../public/images/arrow.png';

// const Sun = Styled.span`
//   background-image: url(${sun});
//   height: 20vh;
// `;

// const Moon = Styled.span`
//   background-image: url(${moon});
//   height: 20vh;
// `;

// const Arrow = Styled.span`
//   background-image: url(${arrow});
//   height: 20vh;
// `;

const Timer = ({ timer, currentPhase }) => {
  // const [timeLeft, setTimeLeft] = useState(200);

  // const tick = () => {
  //   while (timeLeft >= 0) {
  //     setTimeLeft(timeLeft - 1);
  //   }
  // }

  // useEffect(() => {
  //   tick();
  // }, [timeLeft])

  return (
    <div id='column'>
      <SectionHeader>Timer</SectionHeader>
      {currentPhase === 'day'
      ? (
      <>
        <span style={{float:"left", justifyContent: "center", paddingTop: "40%"}}>
          <div style={{display:"flex", justifyContent: "center", fontSize:"3vh"}}>
            {timer}
          </div>
          <img src={arrow} style={{height:"4vh"}} />
        </span>
        <span style={{float:"right", paddingTop: "40%"}}>
          <img src={moon} style={{height:"10vh"}}/>
        </span>
      </>)
      : (
      <>
        <span style={{float:"left", justifyContent: "center", paddingTop: "40%"}}>
          <div style={{display:"flex", justifyContent: "center", fontSize:"3vh"}}>
            {timer}
          </div>
          <img src={arrow} style={{height:"4vh"}} />
        </span>
        <span style={{float:"right", paddingTop: "40%"}}>
          <img src={sun} style={{height:"10vh"}} />
        </span>
      </>)
      }
    </div>
  )
}

export default Timer;
