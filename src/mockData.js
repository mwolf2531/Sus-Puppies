const chatData = [['host', 'Were no strangers to love'], ['megan', 'You know the rules and so do I'],
['himmat', 'A full commitments what Im thinking of'], ['Ryder123', 'Really guys?']];

const data = {
  gameState: {
    timer: 90, //an integer that represents seconds and will countdown.
    previousResult: 'Dare died last night!',
    currentDay: 0,
    currentPhase: 'Day', // use an integer to represent current day. 0 === Day. 1 === Night.
    playerRoles: [['sha2', 0], ['sha10', 0], ['sha3', 0], ['sha1', 2]],
    voting: [['sha2', 'sha10'], ['sha10', null], ['sha3', 'sha10'], ['sha1', 'sha10']], //Null means none votes.
    gameStatus: 'not started',
    phaseResults: [[1, 'Night', 'sha2']], // An array of tuples that will be displayed at the end game screen. [current day, string for time of day of event, player name]
    playerInfo: [{ name: 'Dare', picture: 'todo/pic', player_id: 'sha2' }, { name: 'himmat', picture: 'todo/pic', player_id: 'sha3' }, { name: 'Megan', picture: 'todo/pic', player_id: 'sha10' }, { name: 'Ryder', picture: 'todo/pic', player_id: 'sha1' }],
    ghostChats: chatData, //Himmat: I'm picturing this as an array. Need to change in GamePage if different
    livingChats: chatData, //Himmat: I'm picturing this as an array. Need to change in GamePage if different
    wolfChats: chatData, //Himmat: I'm picturing this as an array. Need to change in GamePage if different
    host: 'sha2', // This is a string that will match Dare's id which is also a string.
    //QUESTION: where will the Ruleset component get data about the current game rules?
    //we mentioned have a GameLogic object listing the particular game rules
  },
  playerState: {
    player_id: 'host', // Asked to be a string. It could be a weird string like this: '12bx#sdr311'
  },
}
//Note: First player to log in will be mapped to host property in the incoming data.

module.exports = { data };
