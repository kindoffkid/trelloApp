const { Schema, model }= require('mongoose')
const taskScheme = new Schema({
  task: String,
  time: {
    type: Date,
    default: Date.now()
  },
  nickname: {
    type: String,
    default: 'lxx'
  },
  list: {
    type: Schema.Types.ObjectId,
    ref: 'List'
  }
})
module.exports =  model('Task', taskScheme)
