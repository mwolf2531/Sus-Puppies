const chatData = [['host', 'Were no strangers to love'], ['megan', 'You know the rules and so do I'],
['himmat', 'A full commitments what Im thinking of'], ['Ryder123', 'Really guys?']];

const data = {
  gameState: {
    timer: 90, //an integer that represents seconds and will countdown.
    previousResult: 'Dare died last night!',
    currentDay: 0,
    currentPhase: 0, // use an integer to represent current day. 0 === Day. 1 === Night.
    playerRoles: [['host', 0], ['megan',0], ['himmat', 0], ['Ryder123',2]],
    voting: [['host', 'megan'], ['megan', 'megan'], ['himmat', 'megan'], ['Ryder123', 'megan']],
    gameStatus: 'playing',
    phaseResults: [1, 'Dare died last night!'], //How and where.
    playerInfo: [{name: 'Dare', picture: 'todo/pic'}, {name: 'Himmat', picture: 'todo/pic'}, {name: 'Megan', picture: 'todo/pic'}, {name: 'Ryder', picture: 'todo/pic'}],
    ghostChats: chatData,
    livingChats: chatData,
    wolfChats: chatData,
    host: 'host' // This is a string that will match host's id which is also a string.
  },
  playerState: {
    player_id: 'host', // Asked to be a string. It could be a weird string like this: '12bx#sdr311'
  },
}
//Note: First player to log in will be mapped to host property in the incoming data.

export default data;