const url = require('url')
const path = require('path')
const { include } = require('berries')
const { matchRoutes } = require('vqua-router')
const handleAction = require('./handleAction')
const handleNotFound = require('./handleNotFound')
const handleFile = require('./handleFile')
const handleError = require('./handleError')

const handleRequest = (request, response, routeIndex = 0) => (async () => {

  request.url = url.parse(request.url)
  request.path = request.url.pathname

  const availableRoutes = request.config.routes.slice(routeIndex)

  const route = matchRoutes(availableRoutes, request.url.pathname)

  const next = () => {

    handleRequest(request, response, route.index + 1)

  }

  const extname = path.extname(request.url.pathname)

  const isActionExtname = include(['', '.html', '.htm', '.json'], extname)

  if (route && isActionExtname) {

    request.params     = route.request.params
    request.segments   = route.request.segments
    request.action     = route.action
    request.controller = route.controller

    handleAction(request, response, next, (error) => {

      request.error = error

      if (error) handleError(request, response)

    })

  } else {

    handleFile(request, response, (error) => {

      request.error = error

      if (error) handleNotFound(request, response)

    })

  }

})()

module.exports = handleRequest
