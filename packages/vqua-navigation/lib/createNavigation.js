const { render } = require('vqua')

const $app = document.getElementById('app')

class NavigationStore {

  constructor() {

    this.liveNodes = []

  }

  setLiveNodes(liveNodes) {

    this.liveNodes = liveNodes

  }

  getLiveNodes() {

    return this.liveNodes

  }

}

const navigate = ({ path, routes, navigationStore }) => {

  new Promise((resolve, reject) => {

    const vquaContainerData = document.getElementById('vqua-container-data')

    if (vquaContainerData) {

      const json = htmlQuotes.decode(vquaContainerData.innerHTML)

      const data = JSON.parse(json)

      vquaContainerData.parentNode.removeChild(vquaContainerData)

      resolve(data)

    } else {

      const route = matchRoutes(routes, path)

      if (!route) resolve(false)

      const request =
        Object.assign({},
          route.request,
          { url: window.location.pathname }
        )

      const response = {
        send: (containerName, props = {}, params = {}) => {
          resolve({ containerName, props, params })
        }
      }

      route.action(request, response)

    }

  }).then((data) => {

    const newContext = {

      context: Object.assign({}, data.context, {

        navigate: (path) => {

          history.pushState({}, '', path)

          navigate({ path, navigationStore, routes })

        }

      })
    }

    return Object.assign({}, data, newContext)

  }).then((data) => {

    const Container = require('./containers/' + data.containerName)

    const templateNodes = [Container.v(data.props)]

    const liveNodes = navigationStore.getLiveNodes()

    const newLiveNodes = render($app, liveNodes, templateNodes, data.context)

    navigationStore.setLiveNodes(newLiveNodes)

  })

}

const navigationStore = new NavigationStore

window.onpopstate = (event) => {

  navigate(document.location.pathname, navigationStore)

}

navigate(document.location.pathname, navigationStore)
