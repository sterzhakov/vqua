const { route } = require('vqua-router')
const { Component, html } = require('vqua')
const WelcomeController = require('../controllers/WelcomeController')

const routes = [
  route('/', WelcomeController.index),
]

module.exports = routes
