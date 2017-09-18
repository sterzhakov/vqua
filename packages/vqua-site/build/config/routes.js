const { route, separateRoutes } = require('vqua-router')
const { Component, html } = require('vqua')
const MainController = require('../controllers/MainController')
const ArticleController = require('../controllers/ArticleController')
const { localeMatcher } = require('./matchers')

const routes = [
  route('/', MainController.index),
  route([localeMatcher], ArticleController.show, {},
    route('/:humanId', ArticleController.show)
  ),
]

module.exports = separateRoutes(routes)
