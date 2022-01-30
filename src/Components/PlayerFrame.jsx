import React, { useState, useEffect } from 'react';
import Timer from './Timer.jsx';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';

const PlayerFrame = (props) => {


  return (

    <div>
      <Row id="chat-row">
        <Col id="column">
          Left Column
        </Col>
        <Col id="column">
          <Row>
            Top Row
          </Row>
          <Row>
            <Timer
              timer={props.timer}
              currentPhase={props.currentPhase}
            />
          </Row>
          <Row>
            Bottom Row
          </Row>
        </Col>
        <Col id="column">
          Right Column
        </Col>
      </Row>
    </div>
  )
}

export default PlayerFrame;