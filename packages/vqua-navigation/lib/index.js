const { htmlQuotes } = require('vqua-utils')
const { matchRoutes } = require('vqua-router')

class Navigation {

  constructor(routes) {

    this.routes = routes

    this.onNavigateCallback = null

  }

  onNavigate(callback) {

    this.onNavigateCallback = callback

  }

  navigate(path, cache = false) {

    if (!this.onNavigateCallback) {

      throw new Error('onNavigate(callback) doesn\'t present')

    } else {

      this.handleRoute(path, cache)

    }

  }

  handleRoute(path, cache) {

    new Promise((resolve, reject) => {

      if (cache) {

        resolve(JSON.parse(cache))

      } else {

        this.handleAction(path, resolve, reject)

      }

    }).then(args => {

      const params = Object.assign({}, args, { path })

      this.onNavigateCallback(params)

    }).catch(error => {

      throw error

    })


  }

  handleAction(path, resolve, reject, routeIndex = 0) {

    const availableRoutes = this.routes.slice(routeIndex)

    const route = matchRoutes(availableRoutes, path)

    if (!route) return reject(new Error('Route not found'))

    const next = () => {

      this.handleAction(path, resolve, reject, route.index + 1)

    }

    const request = Object.assign({}, route.request, { url: path })

    const response = {
      send: (statusCode, componentName, params) => {
        resolve({ statusCode, componentName, params })
      }
    }

    // call hooks

    route.action(request, response, next)


  }

}

module.exports = Navigation
