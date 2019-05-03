const { listSchema, boardSchema, logSchema } = require('../../models')

const path = require('express').Router()

path.delete('/deleteBoard?', async (req, res) => {
  try {
    const { id } = req.query
    const deleteBoardById_QUERY = 
      await boardSchema.deleteOne({
        _id: id
      })
        .exec()
    const deleteAllListChilds_QUERY =
      await listSchema.deleteMany({ board: id }).exec()
    const deleteAllLogChilds_QUERY =
      await logSchema.deleteMany({board: id}).exec()
    res.status(200).json({
      method: 'DELETE',
      url: '/api/boards/deleteBoard',
      status: '200',
      data: {
        board: deleteBoardById_QUERY,
        lists: deleteAllListChilds_QUERY,
        log: deleteAllLogChilds_QUERY,
      }
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      method: 'DELETE',
      url: '/api/boards/deleteBoard',
      status: '500',
      error: error.message
    })
  }
})
module.exports = path