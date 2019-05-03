const { Schema, model } = require('mongoose')
const LogSchema = new Schema({
  board: {
    type: Schema.Types.ObjectId,
    ref: 'Board',
    // required: true
  },
  nickname: {
    type: String,
    // required: [true, 'Please add a nickname'],
  },
  task: {
    type: String,
    // required: [true, 'Please add a task to new log']
  },
  time: {
    type: Date,
    default: Date.now()
  },
})
module.exports = model('Log', LogSchema)