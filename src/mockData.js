const chatData = [['Dare', 'Were no strangers to love'], ['megan', 'You know the rules and so do I'],
['himmat', 'A full commitments what Im thinking of'], ['Ryder', 'Really guys?']];

//note: make sure to send back sha1/player_id to the server firebase.
const data = {
  gameState: {
    timer: 90, //an integer that represents seconds and will countdown.
    previousResult: 'Dare died last night!',
    currentDay: 0,
    currentPhase: 'Day', // use an integer to represent current day. 0 === Day. 1 === Night.
    playerRoles: [['sha2', 0], ['sha10',0], ['sha3', 0], ['sha1',2]],
    voting: [['sha2', 'sha10'], ['sha10', null], ['sha3', 'sha10'], ['sha1', 'sha10']], //Null means none votes.
    gameStatus: 'playing',
    phaseResults: [[1, 'Night', 'sha2']] // An array of tuples that will be displayed at the end game screen. [current day, string for time of day of event, player name]
    playerInfo: [{name: 'Dare', picture: 'todo/pic' player_id: 'sha2'}, {name: 'himmat', picture: 'todo/pic', player_id: 'sha3'}, {name: 'Megan', picture: 'todo/pic', player_id: 'sha10'}, {name: 'Ryder', picture: 'todo/pic', player_id: 'sha1'}],
    gDareChats: chatData,
    livingChats: chatData,
    wolfChats: chatData,
    host: 'Dare', // This is a string that will match Dare's id which is also a string.

  },
  playerState: {
    player_id: 'sha2', // Asked to be a string. It could be a weird string like this: '12bx#sdr311'
    name: 'Dare',
    picture: 'todo/pic',
  },
}
//Note: First player to log in will be mapped to Dare property in the incoming data.

export default data;
