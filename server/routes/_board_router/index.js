const path = require('express').Router()

const get = require('./__get')
const post = require('./__post')
const put = require('./__put')

path.use('/', get)
path.use('/', post)
path.use('/', put)
/*

/
  GET all boards
/getById? 
  GET board by its id

/new? 
  POST with: boardName (create new board)

/updateName?
  PUT with: id, boardName (update boardName)

*/
module.exports = path