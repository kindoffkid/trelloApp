const { listSchema, boardSchema, taskSchema } = require('../../models')
const path = require('express').Router()

path.post('/newTask?', async (req, res) => {

  try
  {
    const { nickname, task, listId } = req.query
    const createNewTask_QUERY = await taskSchema({
      task: task,
      nickname: nickname,
      time: Date.now(),
      list: listId
    }).save()

    const updateListWithNewTask_QUERY = await listSchema.updateOne({ _id: listId }, {
      $push: {
        tasks: {
          task
        }
      }
    })
    res.status(200).json({
      method: 'POST',
      url: '/api/tasks',
      status: '200',
      created_Task: createNewTask_QUERY,
      updated_List: updateListWithNewTask_QUERY
    })
  }

  catch (error)
  {
    console.error(error)
    res.status(500).json({
      method: 'POST',
      url: '/api/tasks',
      status: '500',
      message: error
    })
  }
})
module.exports = path