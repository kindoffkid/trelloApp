const path = require('express').Router()

const get = require('./__get')
const post = require('./__post')

path.use('/', get)
path.use('/', post)

module.exports = path