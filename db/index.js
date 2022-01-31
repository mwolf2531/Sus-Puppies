//Database Code Goes Here
const mongoose = require('mongoose');
const mongoURI = 'mongodb://127.0.0.1:27017/susPuppies';
mongoose.connect(mongoURI);


  const userSchema = new mongoose.Schema({
    // your code here
    username: {
      type: String,
      required: [true, 'Username is Required'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Password is Required'],
    },
    socket: {
      type: String,
    },
  });

  const User = mongoose.model('User', userSchema);

module.exports = User;