const { listSchema, boardSchema, taskSchema } = require('../../models')

const path = require('express').Router()

path.get('/', async (req, res) => {
  try {
    const getAllBoards_QUERY = await boardSchema.find()
      .populate({ path: 'lists', select: '_id listName tasks' })
      .populate({path: 'log', select: '_id nickname task time'})
      .exec()
    console.log( getAllBoards_QUERY )
    res.status(200).json({
      method: 'GET',  
      url: '/api/boards',
      status: '200',
      data: getAllBoards_QUERY.map( board => {
        return {
          _id: board._id,
          boardName: board.boardName,
          lists: board.lists.map(list => ({
            _id: list._id,
            listName: list.listName,
            tasks: list.tasks.map(task => ({
              _id: task._id,
              task: task.task,
              nickname: task.nickname,
              time: new Date(task.time).toLocaleString(undefined, {
                hour12: true,
                hour: '2-digit',
                minute: '2-digit',
                weekday: 'short',
                day: '2-digit',
                month: 'short'
              })
            }))
          })),
          log: board.log.map(elem => ({
            _id: elem._id,
            nickname: elem.nickname,
            task: elem.task,
            time: new Date(elem.time).toLocaleString(undefined, {
              hour12: true,
              hour: '2-digit',
              minute: '2-digit',
              weekday: 'short',
              day: '2-digit',
              month: 'short'
            })
          }))
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