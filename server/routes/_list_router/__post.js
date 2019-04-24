
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
  )
  res.status(200).json({
    method: 'POST',
    url: '/api/lists',
    status: '200',
    data: {
      INSERTED_LIST: insertNewList_QUERY,
      UPDATED_BOARD: addListIdToBoard_QUERY
    }
  })
})

path.post('/addTask?', async (req, res) => {
  try {
    const { id, taskId } = req.query
    const updateList_Query = await listSchema.updateOne(
      {
        _id: id
      },
      {
        $push: {
          tasks: taskId
        }
      }
    )
    res.status(200).json({
      method: 'PUT',
      url: '/api/lists',
      status: '200',
      data: updateList_Query
    })
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

module.exports = path