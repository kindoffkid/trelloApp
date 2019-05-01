const { StringDecoder } = require('string_decoder')
const decoder = new StringDecoder('utf8')

const { listSchema, boardSchema, taskSchema } = require('../../models')

const path = require('express').Router()

path.post('/newList?', async (req, res) => {
  const { listName, boardId } = req.query
  const insertNewList_QUERY = await listSchema({
    listName: listName
  }).save()
  const addListIdToBoard_QUERY = await boardSchema.updateOne(
    {
      _id: boardId
    },
    {
      $push: {
        lists: insertNewList_QUERY._id
      }
    }
  ).exec()
  
  res.status(200).json({
    method: 'POST',
    url: '/api/lists',
    status: '200',
    data: {
      INSERTED_LIST: {
        _id: insertNewList_QUERY._id,
        listName: insertNewList_QUERY.listName,
        tasks: insertNewList_QUERY.tasks
      },
      UPDATED_BOARD: addListIdToBoard_QUERY
    }
  })
})

path.post('/addTask?', async (req, res) => {
  try {
    const { id, task, nickname } = req.query
    const updateList_Query = await listSchema.updateOne(
      {
        _id: id
      },
      {
        $push: {
          tasks: {
            task: task,
            time: Date.now(),
            nickname: nickname
          }
        }
      })
    if (updateList_Query) {
      const response = 
        await listSchema.findById(id)
          .select('tasks listName _id')
        res.status(200).json({
          method: 'PUT',
          url: '/api/lists',
          status: '200',
          data: {
            ...response,
            tasks: response.tasks.map(task => ({
              _id: task._id,
              time: new Date(task.time).toLocaleString(undefined, { hour12: true, hour: '2-digit', minute: '2-digit', weekday: 'short', day: '2-digit', month: 'short' }),
              nickname: task.nickname,
              task: task.task
            }))
          }
        })
      
    }
  } catch (error) {
    console.error(error)
    res.status(error.status).json({
      method: 'PUT',
      url: '/api/lists',
      status: error.status,
      message: error.message
    })
  }
})

path.post('/taskDragDrop?', async (req, res) => {
  try {

    const { targetListId, listId, taskId } = req.query
    console.log('%cTARGET', targetListId,
    'ListId: ', listId, 'taskId: ', taskId)
    const response = await listSchema.findOne({ 'tasks._id': taskId }).exec()
    const removeTaskFromList_QUERY = await listSchema.updateOne({ '_id': listId },
      {
        $pull: {
          tasks: {
            taskId
          }
        }
      }).exec()
  
    const insertTaskToList = await listSchema.updateOne({
      '_id': targetListId
    },
      {
        $push: {
          tasks: response.tasks
        }
      }).exec()
      console.log(insertTaskToList, removeTaskFromList_QUERY)
    res.status(200).json({
      method: 'POST',
      url: '/api/lists/taskDragDrop?',
      status: '200',
      data: {
        removed: removeTaskFromList_QUERY,
        inserted: insertTaskToList
      }
      })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      method: 'POST',
      url: '/api/lists/taskDragDrop?',
      status: '500',
      msg: error.message
    })
  }
})
module.exports = path