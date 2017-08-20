const NavigationStore = require('./NavigationStore')
const navigate = require('./navigate')
const { htmlQuotes } = require('vqua-utils')

const getContainerData = (appDataDom) => {

  const json = htmlQuotes.decode(appDataDom.innerHTML)

  const data = JSON.parse(json)

  return data

}

const createNavigation = (params) => {

  const navigationStore = new NavigationStore

  return {

    listen: () => {

      const data = params.appDataDom
        ? getContainerData(params.appDataDom)
        : null

      if (data) params.appDataDom.parentNode.removeChild(params.appDataDom)

      const navigationParams =
        Object.assign({}, params, {
          path: window.location.pathname,
          store: navigationStore,
          data,
        })

      navigate(navigationParams)

      window.onpopstate = () => {

        const navigationParams =
          Object.assign({}, params, {
            path: window.location.pathname,
            store: navigationStore,
            data: null,
          })

        navigate(navigationParams)

      }

    },

    close: () => {

      window.onpopstate = null

    }

  }

}

module.exports = createNavigation
