import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Claw from "./Claw.jsx";
import Expire from "./Expire.jsx";

const PhaseChangeModal = ({
  socket,
  currentPhase,
  previousResult,
  phaseResults,
  gameStatus,
}) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(
    () => {
      if (
        gameStatus === "playing" &&
        previousResult !== "Villagers Win!" &&
        previousResult !== "Wolves Win!"
      ) {
        handleShow();
      }
    },
    [previousResult],
    [gameStatus]
  );

  let dizplay;
  if (currentPhase === 'day') {
    dizplay = (
      <Expire  delay="2500">
        <Claw />
      </Expire>
    );
  }

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        enforceFocus={true}
      >
        <Modal.Header closeButton={false}></Modal.Header>
        <Modal.Body>
        {previousResult}&nbsp;
        <div style={{ display: "flex", justifyContent: "center" }}>{dizplay}</div>

        </Modal.Body>
        <Modal.Footer className="inputs">
          <Button
            variant="warning"
            onClick={(e) => {
              e.preventDefault();
              handleClose();
            }}
          >
            Next Phase
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default PhaseChangeModal;

{
  /* <div style={{display:"flex",justifyContent:"center"}}>
{dizplay}
</div> */
}
