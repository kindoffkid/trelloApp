const { listSchema, boardSchema, taskSchema } = require('../../models')
const path = require('express').Router()

path.get('/', async (req, res) => {
  try {
    const getAllTasks_QUERY = await taskSchema.find().populate('list')
    res.status(200).json({
      method: 'GET',
      url: '/api/tasks',
      status: '200',
      data: getAllTasks_QUERY.map((task) => {
        return {
          id: task._id,
          task: task.task,
          time: task.time,
          nickname: task.nickname,
          list: task.list
        }
      })
    })
  } catch (error) {
    console.error(error)
    res.status(404).json({
      method: 'GET',
      url: '/api/tasks',
      status: '500',
      message: error.message
    })
  }
})
path.get('/getById?', async (req, res) => {
  try {
    const { id } = req.query
    const getTaskById_QUERY = await taskSchema.findById({_id: id}).populate('list')
    res.status(200).json({
      method: 'GET',
      url: '/api/tasks/id',
      status: '200',
      data: getTaskById_QUERY
    })
  } catch (error) {
    console.error(error)
    res.status(404).json({
      method: 'GET',
      url: '/api/tasks/id',
      status: '500',
      message: error.message
    })
  }
})

module.exports = path