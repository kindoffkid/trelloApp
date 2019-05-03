const path = require('express').Router()
const { boardSchema, logSchema } = require('../../models')

path.post('/new?', async (req, res) => {
  try {
    const { boardId, nickname, task } = req.query
    const addNewLog_QUERY = await logSchema({
      board: boardId,
      nickname: nickname,
      task: task,
      time: Date.now()
    }).save()
    
    if (addNewLog_QUERY) {
      const updateBoard_QUERY = await boardSchema.updateOne({ _id: boardId }, {
        $push: {
          log: [addNewLog_QUERY._id]
        }
      })
      if (updateBoard_QUERY) {
        res.status(200).json({
          method: 'POST',
          url: '/api/boards/new',
          status: '200',
          data: {
            _id: addNewLog_QUERY._id,
            nickname: addNewLog_QUERY.nickname,
            task: addNewLog_QUERY.task,
            time: new Date(addNewLog_QUERY.time).toLocaleString(
              undefined,
              {
                hour12: true,
                hour: '2-digit',
                minute: '2-digit',
                weekday: 'short',
                day: '2-digit',
                month: 'short'
              }
            )
          }
        })
      }
    }
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