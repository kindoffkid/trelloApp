const path = require('express').Router()

const get = require('./__get')
const post = require('./__post')

path.use('/', get)
path.use('/', post)


/* 

/         
  GET all tasks

/getById? 
  GET task by id provided after ?id=(you're id)

/newTask? 
  POST with nickname, task, listId (create new task)

*/
module.exports = path
