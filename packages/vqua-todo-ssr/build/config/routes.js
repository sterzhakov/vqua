const { route } = require('vqua-router')
const { Component, html } = require('vqua')
const TasksController = require('../controllers/TasksController')

const routes = [
  route('/', TasksController.index),
]

module.exports = routes
