const { render } = require('vqua')
const { matchRoutes } = require('vqua-router')

const navigate = ({ onNavigate, routes, path, store, cache }) => {

  new Promise((resolve, reject) => {

    if (cache) {

      resolve(JSON.parse(cache))

    } else {

      const route = matchRoutes(routes, path)

      if (!route) resolve(false)

      const request =
        Object.assign({},
          route.request,
          { url: path }
        )

      const response = {
        send: (statusCode, name, props = {}, params = {}) => {
          resolve({ statusCode, name, props, params })
        }
      }

      route.action(request, response)

    }

  }).then((data) => {

    const params = {
      liveNodes: store.get() || [],
      component: {
        name: data.name,
        context: data.context,
        props: data.props,
      },
      navigate: (path) => {

        history.pushState({}, '', path)

        navigate({ onNavigate, routes, path, store, cache: null })

      },
      callback: data => store.set(data),

    }

    onNavigate(params)

  })

}

module.exports = navigate
