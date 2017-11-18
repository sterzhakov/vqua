const { render } = require('vqua')
const Navigation = require('vqua-navigation')
const initRoutes = require('./initializers/initRoutes')

initRoutes().then(routes => {

  let liveNodes = []

  const navigation = new Navigation(routes)

  navigation.onNavigate(({ path, statusCode, componentName, params }) => {

    const $app = document.getElementById('app')

    const Component = require('./containers/' + componentName)

    const context = Object.assign(params.context, {
      navigate: navigation.navigate.bind(navigation)
    })

    const templateNodes = [ Component.v(params.props, context) ]

    liveNodes = render($app, liveNodes, templateNodes, context)

  })


  navigation.onRedirect(({ redirectPath, statusCode, params }) => {

    window.history.pushState({}, '', redirectPath)

    navigation.navigate(redirectPath)

  })


  const $cache = document.getElementById('app-cache')

  const cache = $cache.innerHTML

  $cache.parentNode.removeChild($cache)


  navigation.navigate(window.location.pathname, cache)


  window.onpopstate = (event) => {

    navigation.navigate(window.location.pathname)

  }


})
