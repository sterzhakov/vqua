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

    this.request = null

    this.response = null

    new Promise((resolve, reject) => {

      if (cache) {

        resolve(JSON.parse(cache))

      } else {

        this.handleAction(path, 0, (data) => {

          resolve(data)

        })

      }

    }).then((data) => {

      const params = Object.assign({}, data, { path })

      if (include([300,301], params.statusCode)) {

        this.onRedirectCallback(params)

      } else {

        this.onNavigateCallback(params)

      }

    })

  }

  handleAction(path, routeIndex, callback) {

    const availableRoutes = this.routes.slice(routeIndex)

    const route = matchRoutes(availableRoutes, path)

    const next = () => {

      this.handleAction(path, route.index + 1, callback)

    }

    if (!this.request) {

      this.request = Object.assign({}, route.request)

    }


    if (!this.response) {

      this.response = {
        send: (statusCode, componentName, params = {}) => {
          callback({ statusCode, componentName, params })
        },
        redirect: (statusCode, redirectPath, params = {}) => {
          callback({ statusCode, redirectPath, params })
        }
      }

    }

    route.action(this.request, this.response, next)

  }

}

module.exports = Navigation
