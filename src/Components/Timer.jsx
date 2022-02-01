import React, { useState, useEffect } from "react";
import Styled from "styled-components";
import { GlobalStyles, SectionHeader } from "../../public/sharedStyles.js";
// const sun = './images/sun.png';
// const moon = './images/moon.png';
// const arrow = './images/arrow.png';
import sun from "../../public/images/sun.png";
import moon from "../../public/images/moon.png";
import arrow from "../../public/images/arrow.png";
import Moon from "../../public/images/alt-moon.svg";
import Sun from "../../public/images/alt-sun.svg";

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
    <div id="column">
      <SectionHeader style={{ textAlign: "center" }}>Timer</SectionHeader>
      {currentPhase === "day" ? (
        <>
          <span style={{ display: "flex", justifyContent: "center" }}>
            {timer}
          </span>
          <span style={{ display: "flex", justifyContent: "center" }}>
            <img src={Moon} style={{ height: "12vh", padding: "10px 0 10px 0" }} />
          </span>
        </>
      ) : (
        <>
          <span style={{ display: "flex", justifyContent: "center" }}>
            {timer}
          </span>
          <span style={{ display: "flex", justifyContent: "center" }}>
            <img src={Sun} style={{ height: "12vh", padding: "10px 0 10px 0" }} />
          </span>
        </>
      )}
    </div>
  );
};

export default Timer;

{
  /* <span style={{float:"left", justifyContent: "center", paddingTop: "40%"}}>
<div style={{display:"flex", justifyContent: "center", fontSize:"3vh"}}>
  {timer}
</div>
<img src={arrow} style={{height:"4vh"}} />
</span>
<span style={{float:"right", paddingTop: "40%"}}>
<img src={Sun} style={{height:"10vh"}} />
</span> */
}

{
  /* <span style={{float:"left", justifyContent: "center", paddingTop: "40%"}}>
<div style={{display:"flex", justifyContent: "center", fontSize:"3vh"}}>
  {timer}
</div>
<img src={arrow} style={{height:"4vh"}} />
</span>
<span style={{float:"right", paddingTop: "40%"}}>
<img src={Moon} style={{height:"10vh"}}/>
</span> */
}
