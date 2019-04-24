const { listSchema, boardSchema, taskSchema } = require('../../models')

const path = require('express').Router()

path.get('/', async (req, res) => {
  try {
    const getAllBoards_QUERY = await boardSchema.find()
      .populate('lists')
      .exec()
    res.status(200).json({
      method: 'GET',
      url: '/api/lists',
      status: '200',
      data: getAllBoards_QUERY.map((board, index) => {
        return {
          id: board._id,
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
    console.log( req.query )
    const { id } = req.query
    const getBoardById_QUERY =
      await boardSchema.find({ _id: id }).populate('lists').exec()
    res.status(200).json({
      method: 'GET',
      url: '/api/boards/:id',
      status: '200',
      data: getBoardById_QUERY.map((board) => {
        return {
          id: board._id,
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
module.exports = path