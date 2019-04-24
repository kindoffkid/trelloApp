const { listSchema, boardSchema, taskSchema } = require('../../models')

const path = require('express').Router()

path.get('/', async (req, res) => {
  try {
    const getAllBoards_QUERY = await boardSchema.find()
      .populate('lists')
      .exec()
    res.status(200).json({
      method: 'GET',
      url: '/api/boards',
      status: '200',
      data: getAllBoards_QUERY.map( board => {
        return {
          _id: board._id,
          boardName: board.boardName,
          lists: board.lists, 
        }
       })
    })
  } catch (error) {
    console.error(error)
    res.status(404).json({
      method: 'GET',
      url: '/api/boards',
      status: '404',
      message: error.message
    })
  }
})
path.get('/getById?', async (req, res) => {
  try {
    const { id } = req.query
    const getBoardById_QUERY =
      await boardSchema.find({ _id: id })
        .populate('lists')
        .exec()
    res.status(200).json({
      method: 'GET',
      url: '/api/boards/getById',
      status: '200',
      data: getBoardById_QUERY
    })
  } catch (error) {
    console.error(error)
    res.status(404).json({
      method: 'GET',
      url: '/api/boards',
      status: '404',
      message: error.message
    })
  }
})
module.exports = path