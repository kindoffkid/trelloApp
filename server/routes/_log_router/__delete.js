const path = require('express').Router()
const { boardSchema, logSchema } = require('../../models')

path.delete('/deleteLog?', async (req, res) => {
  try {
    const { boardId } = req.query
    const removeLogsFromBoard_QUERY = await boardSchema.updateOne({ _id: boardId }, {
      $set: {
        'log': []
      }
    }).exec()
    if (removeLogsFromBoard_QUERY) {
      const clearAllLogs_QUERY =
        await logSchema
          .deleteMany({ board: boardId })
          .exec()
      res.status(200).json({
        method: 'DELETE',
        url: '/api/logs/deleteLog',
        status: '200',
        updatedBoard: removeLogsFromBoard_QUERY,
        deletedLogs: clearAllLogs_QUERY
      })
      
    }

  } catch (error) {
    console.error(error)
    res.status(404).json({
      method: 'DELETE',
      url: '/api/logs/deleteLog',
      status: '500',
      message: error.message
    })
  }
})
module.exports = path