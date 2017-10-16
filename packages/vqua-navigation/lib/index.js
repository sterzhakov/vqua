const { htmlQuotes } = require('vqua-utils')
const { matchRoutes } = require('vqua-router')
const { include } = require('vqua-utils')

class Navigation {

  constructor(routes) {

    this.routes = routes

    this.request = null

    this.response = null

    this.onNavigateCallback = null

    this.onRedirectCallback = null

  }

  onNavigate(callback) {

    this.onNavigateCallback = callback

  }

  onRedirect(callback) {

    this.onRedirectCallback = callback

  }

  navigate(path, cache = false) {

    new Promise((resolve, reject) => {

      if (cache) {

        resolve(JSON.parse(cache))

      } else {

        this.handleAction(path, resolve, reject)

      }

    }).then(data => {

      const params = Object.assign({}, data, { path })

      if (include([300,301], params.statusCode)) {

        this.onRedirectCallback(params)

      } else {

        this.onNavigateCallback(params)

      }

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

    this.request = this.request || Object.assign({},
      route.request, { url: path }
    )

    this.response = this.response || {
      send: (statusCode, componentName, params = {}) => {
        resolve({ statusCode, componentName, params })
      },
      redirect: (statusCode, redirectPath, params = {}) => {
        resolve({ statusCode, redirectPath, params })
      }
    }

    // call hooks

    route.action(this.request, this.response, next)


  }

}

module.exports = Navigation
