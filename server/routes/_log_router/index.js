const path = require('express').Router()

const post = require('./__post')
const deleteRoute = require('./__delete')

path.use('/', post)
path.use('/', deleteRoute)

module.exports = path