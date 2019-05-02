const { Schema, model } = require('mongoose')

const boardScheme =  new Schema({
  boardName: String,
  lists: [
    {
      type: Schema.Types.ObjectId,
      ref: 'List'
    },
  ],
  log: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Log'
    }
  ]
})
module.exports =  model('Board', boardScheme)
