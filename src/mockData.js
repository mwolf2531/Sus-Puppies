const chatData = [['host', 'Were no strangers to love'], ['megan', 'You know the rules and so do I'],
['himmat', 'A full commitments what Im thinking of'], ['Ryder123', 'Really guys?']];

const data = {
  gameState: {
    timer: 90, //an integer that represents seconds and will countdown.
    previousResult: 'Dare died last night!',
    currentDay: 0,
<<<<<<< HEAD
    currentPhase: 0, // use an integer to represent current day. 0 === Day. 1 === Night.
    playerRoles: [['host', 0], ['megan',0], ['himmat', 0], ['Ryder123',2]],
    voting: [['host', 'megan'], ['megan', null], ['himmat', 'megan'], ['Ryder123', 'megan']],
    gameStatus: 'playing',
    phaseResults: [1, 'Dare died last night!'], //How and where.
    playerInfo: [{name: 'Dare', picture: 'todo/pic'}, {name: 'Himmat', picture: 'todo/pic'}, {name: 'Megan', picture: 'todo/pic'}, {name: 'Ryder', picture: 'todo/pic'}],
    ghostChats: chatData,
    livingChats: chatData,
    wolfChats: chatData,
    host: 'host' // This is a string that will match host's id which is also a string.
=======
    currentPhase: 'Day', // use an integer to represent current day. 0 === Day. 1 === Night.
    playerRoles: [['sha2', 0], ['sha10', 0], ['sha3', 0], ['sha1', 2]],
    voting: [['sha2', 'sha10'], ['sha10', null], ['sha3', 'sha10'], ['sha1', 'sha10']], //Null means none votes.
    gameStatus: 'playing',
    phaseResults: [[1, 'Night', 'sha2']] // An array of tuples that will be displayed at the end game screen. [current day, string for time of day of event, player name]
    playerInfo: [{ name: 'Dare', picture: 'todo/pic' player_id: 'sha2' }, { name: 'himmat', picture: 'todo/pic', player_id: 'sha3' }, { name: 'Megan', picture: 'todo/pic', player_id: 'sha10' }, { name: 'Ryder', picture: 'todo/pic', player_id: 'sha1' }],
    ghostChats: chatData,
    livingChats: chatData,
    wolfChats: chatData,
    host: 'sha2', // This is a string that will match Dare's id which is also a string.

>>>>>>> 896eadc658f11dc38739d656af0c1f7f786ebfa5
  },
  playerState: {
    player_id: 'host', // Asked to be a string. It could be a weird string like this: '12bx#sdr311'
  },
}
//Note: First player to log in will be mapped to host property in the incoming data.

export default data;
