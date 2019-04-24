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
  taskRouter
} = require('./routes')

main.listen(4000, '127.0.0.1')
main.use(express.json())
main.use(express.urlencoded({extended: false}))
main.use(require('morgan')('dev'))

main.use('/api/boards', boardRouter)
main.use('/api/lists', listRouter)
main.use('/api/tasks', taskRouter)

function setGetList() {

  return express.Router().get('/', (req, res) => {
    console.log( req.body )
  })
}






















main.get('/tasks', (req, res) => {
  const { taskId } = req.body
  taskSchema.find({ _id: taskId })
    .populate('list')
    .populate('board')
    .exec((err, result) => {
      if (err) throw err
      res.status(200).json(result)
    })
})
// main.post('/boards', async (req, res) => {
//   const { boardName } = req.body

//   boardSchema({ boardName: boardName }).save((error, result) => {
//     if (error) return new Error(error)
//     console.log( '%cINSERTED NEW BOARD:', 'color: orange', result )
//     res.status(200).json(result)
//   })
// })

/* Mai intii, creem un board. */
main.post('/boards', (req, res) => {
  const { boardName } = req.body
  boardSchema({ boardName: boardName }).save((err, result) => {
    if(err) return console.error(err)
    console.log('Inserted new Board', result)
    res.status(200).json({
      "status": "200",
      "board": result
    })
  })
})

/* Creind un nou list, adaugam in el referinta la Board parinte prin board: id */
main.post('/lists', (req, res) => {
  const { listName, board } = req.body
  listSchema({
    listName: listName,
    board: board
  }).save((err, rs) => {
    if (err) throw err
    boardSchema.findOneAndUpdate({ _id: board }, { $push: { lists: rs._id } }, (err, queryResult) => {
      if (err) throw err
      console.log( rs, queryResult )
      res.status(200).json({
        "method": "POST",
        "url": '/lists',
        "status": '200',
        newlist: rs,
        parentboard: queryResult
      })
    })
  })
})

/* Creind taskul, stocam in el id-ul listei parinte, prin lista, ajungem la board */
main.post('/tasks', (req, res) => {
  const { task, list } = req.body
  taskSchema({
    task: task,
    list: list
  })
    .save((err, taskResult) => {
      if (err) return new Error(err.message)
      listSchema.findOneAndUpdate({ _id: list }, { $push: { tasks: taskResult._id } }, (err, pushResult) => {
        if (err) return new Error(err)
        res.status(200).json({
          method: 'POST',
          url: '/tasks',
          status: '200',
          new_task: taskResult,
          updated_list: pushResult
        })
      })
  })
})

// main.put('/lists', (req, res) => {
//   const { list, task } = req.body
//   listSchema.findOneAndUpdate({
//     _id: list
//   },
//   {
//     $push: {
//       tasks: task
//     }  
//     }, (err, result) => {
//     if (err) throw err
//     res.status(200).json(result)
//   })
// })

// const x = {
//   board: '5cbdb0058e775959f8238d72',
//   list: '5cbdb088fdc68ce31c0335ce',
// }
// main.post('/tasks', (req, res) => {
//   const { task, listId } = req.body
//   taskSchema({
//     task: task,
//     list: listId,
//   }).save((err, result) => {
//     if (err) return new Error(err)
//     console.log('Inserted_new_TASK', result)

//     res.status(200).json(result)
//   })
// })

// main.get('/boards', (req, res) => {
//   const { _id } = req.body
//   taskSchema.find({})
//     .populate('list')
//     .populate('board')
//     .exec()
//     .then(res => console.log(res))
//     .catch(err => console.error(err))
// })
