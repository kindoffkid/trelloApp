const { Schema, model } =  require('mongoose')
const taskSchema = require('./__taskModel')
// const listScheme =  new Schema({
//   listName: String,
//   board: {
//     type: Schema.Types.ObjectId,
//     ref: 'Board'
//   },
//   tasks: [{
//     type: Schema.Types.ObjectId,
//     ref: 'Task'
//   }]
// })
const listScheme = new Schema({
  listName: String,
  board: {
    type: Schema.Types.ObjectId,
    ref: 'Board'
  },
  tasks: [taskSchema]
})
module.exports = model('List', listScheme)
