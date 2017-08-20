const { render } = require('vqua')
const { matchRoutes } = require('vqua-router')

const navigate = ({
  appDom,
  data,
  path,
  store,
  getContainer,
  routes,
}) => {

  new Promise((resolve, reject) => {

    if (data) {

      resolve(data)

    } else {

      const route = matchRoutes(routes, path)

      if (!route) resolve(false)

      const request =
        Object.assign({},
          route.request,
          { url: path }
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

          navigate({
            appDom,
            path,
            store,
            getContainer,
            routes,
          })

        }

      })
    }

    return Object.assign({}, data, newContext)

  }).then((data) => {

    const Container = getContainer(data.containerName)

    const templateNodes = [Container.v(data.props)]

    const liveNodes = store.getLiveNodes()

    const newLiveNodes = render(appDom, liveNodes, templateNodes, data.context)

    store.setLiveNodes(newLiveNodes)

  })

}

module.exports = navigate
