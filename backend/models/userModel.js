var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var userSchema = new Schema({
  username: {
    type: String,
  },
  password: {
    type: String,
  },
  email: {
    type: String,
    unique: true
  }
})

module.exports = {
  UserTableModel: mongoose.model('user_master', userSchema, 'user_master')
}