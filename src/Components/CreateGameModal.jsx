import React, { useState, useEffect } from 'react';

const CreateGameModal = () => {


  return (
    <div>
      Number of Wolves:
      <input type="text"></input>
      <div>
        <button type="button">Create Game</button>
      </div>
    </div>
  )

}

export default CreateGameModal;