const { Schema, model }= require('mongoose')
// const taskSchema = new Schema({
//   task: String,
//   time: {
//     type: Date,
//     default: Date.now()
//   },
//   nickname: {
//     type: String,
//     default: 'lxx'
//   },
//   list: {
//     type: Schema.Types.ObjectId,
//     ref: 'List'
//   }
// })
const taskSchema = new Schema({
  task: String,
  time: {
    type: Date,
    default: Date.now()
  },
  nickname: {
    type: String,
    default: 'lxx'
  },
})
module.exports = taskSchema
// module.exports =  model('Task', taskSchema)
