const { Schema, model } =  require('mongoose')

const listScheme =  new Schema({
  listName: String,
  board: {
    type: Schema.Types.ObjectId,
    ref: 'Board'
  },
  tasks: [{
    type: Schema.Types.ObjectId,
    ref: 'Task'
  }]
})
module.exports = model('List', listScheme)
