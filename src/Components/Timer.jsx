import React, { useState, useEffect } from 'react';
import Styled from 'styled-components';
const sun = '../../images/sun.png';
const moon = '../../images/moon.png';
const arrow = '../../images/arrow.png';

const Sun = Styled.span`
  background-image: url(${sun});
  height: 20vh;
`;

const Moon = Styled.span`
  background-image: url(${moon});
  height: 20vh;
`;

const Arrow = Styled.span`
  background-image: url(${arrow});
  height: 20vh;
`;

const Timer = (props) => {
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
    <div>
      <h2>Timer</h2>
      <Sun />
      <Moon />
      <Arrow />
      {/* <span>{timeLeft}</span> */}
    </div>
  )
}

export default Timer;
