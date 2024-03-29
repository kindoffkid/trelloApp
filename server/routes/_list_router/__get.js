const {
  listSchema,
  boardSchema,
  taskSchema
} = require('../../models')

const path = require('express').Router()

path.get('/', async (req, res) => {
  try {
    const getAllLists_QUERY = await
      listSchema.find()
        .select('_id listName tasks')
        .populate('board')
    console.log(getAllLists_QUERY)
    res.status(200).json({
      method: 'GET',
      url: '/api/lists',
      status: '200',
      data: getAllLists_QUERY
    })
  } catch (error) {
    console.error(error)
    res.status(error.status).json({
      method: 'GET',
      url: '/api/lists',
      status: error.status,
      message: error.message
    })
  }
})  

path.get('/getById?', async (req, res) => {
  try {
    const { id } = req.query
    const getListById_QUERY = await listSchema.findById({
      _id: id
    })
      .populate('board')
    res.status(200).json({
      method: 'GET',
      url: '/api/lists/getById',
      status: '200',
      data: getListById_QUERY
    })
  } catch (error) {
    console.error(error)
    res.status(error.status).json({
      method: 'GET',
      url: '/api/lists/getById',
      status: error.status,
      message: error.message
    })
  }
})
module.exports = path