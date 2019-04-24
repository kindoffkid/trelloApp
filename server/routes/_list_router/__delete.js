const { listSchema, boardSchema, taskSchema } = require('../../models')

const path = require('express').Router()


path.delete('/deleteList?', async (req, res) => {
  try {
    const { id, boardId } = req.query
    const deleteList_QUERY = await
      listSchema.deleteOne({
        _id: id
      })
    const deleteListFromBoard_QUERY = await boardSchema.updateOne({
      _id: boardId
    },
      {
        $pull: {
          lists: {
            $in: [id]
          }
        }
      })
    res.status(200).json({
      method: 'DELETE',
      url: '/api/lists',
      status: '200',
      deletedList: deleteList_QUERY,
      updatedBoard: deleteListFromBoard_QUERY
    })
  } catch (error) {
    console.error(error)
    res.status(error.status).json({
      method: 'DELETE',
      url: '/api/lists',
      status: error.status,
      message: error.message
    })
  }
})

module.exports = path