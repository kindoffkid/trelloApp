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
/betById?  get by id, id in urlencoded

/newList? POST with new listName, boardId
/addTask? POST with listId, taskId (add existing task to list)

/updateName? PUT with listId, and new listName

/deleteList? DELETE with listId, boardId

*/
module.exports = path