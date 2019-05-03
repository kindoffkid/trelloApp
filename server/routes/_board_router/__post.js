const { listSchema, boardSchema, taskSchema } = require('../../models')

const path = require('express').Router()

path.post('/new?', async (req, res) => {
  try {
    const { boardName } = req.query
    const createNewBoard_QUERY = await boardSchema({ boardName: boardName, lists: [] }).save()
    res.status(200).json({
      method: 'POST',
      url: '/api/boards/new',
      status: '200',
      data: createNewBoard_QUERY
    })
  } catch (error) {
    console.error(error)
    res.status(404).json({
      method: 'POST',
      url: '/api/boards/new',
      status: '500',
      message: error.message
    })
  }
})
module.exports = path
