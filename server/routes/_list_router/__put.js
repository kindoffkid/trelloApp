const { listSchema, boardSchema, taskSchema } = require('../../models')

const path = require('express').Router()

path.put('/updateName?', async (req, res) => {
  try {
    const { id, listName } = req.query 
    const updateList_Query = await
      listSchema.updateOne({
        _id: id
      },
      {
        listName: listName
      })
    res.status(200).json({
        method: 'PUT',
        url: '/api/lists',
        status: '200',
        data: updateList_Query
    })
  } catch (error) {
    console.error(error)
    res.status(error.status).json({
      method: 'PUT',
      url: '/api/lists',
      status: error.status,
      message: error.message
    })
  }
})

module.exports = path
