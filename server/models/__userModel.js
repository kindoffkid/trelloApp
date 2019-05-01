const { Schema, model } = require('mongoose')
const UserSchema = new Schema({
  email: {
    type: String,
    required: [true, 'Email required'],
    minlength: 5,
    maxlength: 16,
    unique: [true, 'Email needed to be unique'],
    match: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    // match: /^(?=.*[A-Za-z])(?=.*d)[A-Za-zd]{5,}$/
  }
}) 
module.exports = model('User', UserSchema)