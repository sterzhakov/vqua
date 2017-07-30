const url = require('url')
const { matchRoutes } = require('vqua-router')
const handleAction = require('./handleAction')
const handleNotFound = require('./handleNotFound')
const handleFile = require('./handleFile')
const handleError = require('./handleError')

module.exports = (request, response) => (async () => {

  const { pathname } = url.parse(request.url)

  const route = matchRoutes(request.config.routes, pathname)

  if (route) {

    const requestRoute = Object.assign({}, request, {
      params: route.request.params,
      segments: route.request.segments,
      action: route.action,
    })

    handleAction(requestRoute, response, (error) => {

      const requestError = Object.assign({}, requestRoute, { error })

      if (error) handleError(requestError, response)

    })

  } else {

    handleFile(request, response, (error) => {

      const requestError = Object.assign({}, request, { error })

      if (error) handleNotFound(requestError, response)

    })

  }

})()
