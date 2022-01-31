import React, { useState, useEffect } from 'react';
import Timer from './Timer.jsx';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';

const PlayerFrame = (props) => {


  return (

    <>
      <Row id="chat-row" className="set-height">
        <Col xs={2} className="column">
          Left Column
        </Col>
        <Col className="column" id="playerFrame-col-2">
          <Row id="playerFrame-top-row">
            Top Row
          </Row>
          <Row id="playerFrame-table">
            <Timer
              timer={props.timer}
              currentPhase={props.currentPhase}
            />
          </Row>
          <Row id="playerFrame-bottom-row">
            Bottom Row
          </Row>
        </Col>
        <Col xs={2} className="column">
          Right Column
        </Col>
      </Row>
    </>
  )
}

export default PlayerFrame;