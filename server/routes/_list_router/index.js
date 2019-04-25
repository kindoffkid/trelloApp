const path = require('express').Router();

const get = require('./__get');
const post = require('./__post');
const put = require('./__put');
const deLete = require('./__delete')

path.use('/', get)
path.use('/', post)
path.use('/', put)
path.use('/', deLete)


/* 

/ get all
/betById?id=  get by id, id in urlencoded

/newList? POST with new listName, boardId
/addTask? POST with id, task, nickname (add existing task to list)

/updateName? PUT with id, listName

/deleteList? DELETE with id, boardId
/deleteTask? DELETE with id, taskId


*/
module.exports = path