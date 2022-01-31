import React, { useState, useEffect } from "react";
import wolf from "./wolfClaw.svg";

const Fader = (props) => {
  const [fadeProp, setFadeProp] = useState({
    fade: "fade-in",
  });

  useEffect(() => {
    const timeout = setInterval(() => {
      if (fadeProp.fade === "fade-in") {
        setFadeProp({
          fade: "fade-out",
        });
      } else {
        setFadeProp({
          fade: "fade-in",
        });
      }
    }, 2000);
    return () => clearInterval(timeout);
  }, [fadeProp]);

  return (
    <>
      <img src={wolf} width={300} className={fadeProp.fade} alt="wolf" />
    </>
  );
};

export default Fader;
