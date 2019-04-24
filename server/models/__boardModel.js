const { Schema, model } = require('mongoose')

const boardScheme =  new Schema({
  boardName: String,
  lists: [
    {
      type: Schema.Types.ObjectId,
      ref: 'List'
    },
  ]
})
module.exports =  model('Board', boardScheme)
