const { htmlQuotes } = require('berries')
const { matchRoutes } = require('vqua-router')
const { include } = require('berries')

class Navigation {

  constructor(routes) {

    this.routes = routes

    this.request = null

    this.response = null

    this.path = null

    this.onNavigateCallback =
      ({ path, statusCode, componentName, params }) => {}

    this.onRedirectCallback =
      ({ redirectPath, statusCode, params }) => {}

    this.isNeedNavigateCallback =
      (path, nextPath) => { return path != nextPath }

  }

  onNavigate(callback) {

    this.onNavigateCallback = callback

  }

  isNeedNavigate(callback) {

    this.isNeedNavigateCallback = callback

  }

  onRedirect(callback) {

    this.onRedirectCallback = callback

  }

  navigate(path, cache = false) {

    if (!this.isNeedNavigateCallback(path, this.path)) return false

    this.request = null

    this.response = null

    this.path = path

    return new Promise((resolve, reject) => {

      if (cache) {

        resolve(JSON.parse(cache))

      } else {

        this.handleAction(path, 0, (data) => {

          resolve(data)

        })

      }

    }).then((data) => {

      const params = Object.assign({}, data, { path })

      const redirectCodes = [ 301, 302, 303, 305, 307 ]

      if (include(redirectCodes, params.statusCode)) {

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
        redirect: (statusCode, path, params = {}) => {
          callback({ statusCode, path, params })
        }
      }

    }

    route.action(this.request, this.response, next)

  }

}

module.exports = Navigation
