const url = require('url')
const path = require('path')
const { include } = require('vqua-utils')
const { matchRoutes } = require('vqua-router')
const handleAction = require('./handleAction')
const handleNotFound = require('./handleNotFound')
const handleFile = require('./handleFile')
const handleError = require('./handleError')

const handleRequest = (request, response, routeIndex = 0) => (async () => {

  const { pathname } = url.parse(request.url)

  const availableRoutes = request.config.routes.slice(routeIndex)

  const route = matchRoutes(availableRoutes, pathname)

  const next = () => {

    handleRequest(request, response, route.index + 1)

  }

  const extname = path.extname(pathname)

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
