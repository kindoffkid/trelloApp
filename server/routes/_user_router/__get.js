const { listSchema, boardSchema, taskSchema, userSchema } = require('../../models')
const crypt = require('bcryptjs')

const path = require('express').Router()

path.get('/', async (req, res) => {
  try { 
    const getAllUsers_QUERY = await userSchema.find().exec()
    res.status(200).json({
      method: 'GET',
      url: '/api/users',
      status: '200',
      data: getAllUsers_QUERY
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      method: 'GET',
      url: '/api/users',
      status: '500',
      error: error.message
    })
  }
})
module.exports = path
