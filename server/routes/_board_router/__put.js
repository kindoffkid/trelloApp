const { listSchema, boardSchema, taskSchema } = require('../../models')

const path = require('express').Router()

path.put('/updateName?', async (req, res) => {
  try {
    const { id, boardName } = req.query
    const updateBoardById_QUERY = 
      await boardSchema.updateOne({
        _id: id
      },
      {
        boardName: boardName  
        }).exec()
    res.status(200).json({
      method: 'PUT',
      url: '/api/boards/updateName',
      status: '200',
      data: updateBoardById_QUERY
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      method: 'PUT',
      url: '/api/boards/updateName',
      status: '500',
      error: error.message
    })
  }
})
module.exports = path
