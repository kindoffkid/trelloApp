const mongoose = require('mongoose')
mongoose.connect('mongodb://127.0.0.1:27017/aralakh', { useNewUrlParser: true })
mongoose.connection.on('error', error => console.error(error))
mongoose.connection.once('open', () => {
  console.log('DB CONNECTED___')
})
