const Store = require('./Store')
const navigate = require('./navigate')
const { htmlQuotes } = require('vqua-utils')

const createParams = (params) => {

  const cache = params.cache
    ? htmlQuotes.decode(params.cache)
    : null

  return Object.assign({}, params, { cache })

}

const createNavigation = ({ routes, cache }, onNavigate) => {

  const store = new Store

  return {

    listen: () => {

      const params =
        createParams({
          onNavigate,
          routes,
          path: window.location.pathname,
          store: store,
          cache,
        })

      navigate(params)

      window.onpopstate = () => {

        const params =
          createParams({
            onNavigate,
            routes,
            path: window.location.pathname,
            store: store,
            cache: null,
          })

        navigate(params)

      }

    },

    close: () => {

      window.onpopstate = null

    }

  }

}

module.exports = createNavigation
