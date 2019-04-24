const {
  listSchema,
  taskSchema,
  boardSchema } = require('./models')

const express = require('express')
const main = express()
const { db } = require('./config/database')

// ROUTES
const {
  boardRouter,
  listRouter,
} = require('./routes')

main.listen(4000, '127.0.0.1')
main.use(express.json())
main.use(express.urlencoded({extended: false}))
main.use(require('morgan')('dev'))

main.use('/api/boards', boardRouter)
main.use('/api/lists', listRouter)