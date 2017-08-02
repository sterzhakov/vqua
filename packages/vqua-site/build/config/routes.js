const { route } = require('vqua-router')
const { Component, html } = require('vqua')
const MainController = require('../controllers/MainController')
const ArticleController = require('../controllers/ArticleController')

module.exports = [
  route('/', MainController.index),
  route('/:locale', ArticleController.show),
  route('/:locale/:articleId', ArticleController.show)
]
