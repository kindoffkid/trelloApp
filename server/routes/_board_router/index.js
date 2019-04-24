const path = require('express').Router()

const get = require('./__get')
const post = require('./__post')
const put = require('./__put')
const deleteBoard = require('./__delete')

path.use('/', get)
path.use('/', post)
path.use('/', put)
path.use('/', deleteBoard)


/*

/
  GET all boards

/getById? 
  GET with id (get board BY id)

/new? 
  POST with: boardName (create new board)

/updateName?
  PUT with: id, boardName (update boardName)

*/
module.exports = path