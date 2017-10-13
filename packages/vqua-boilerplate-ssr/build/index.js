const { render } = require('vqua')
const createNavigation = require('vqua-navigation')
const routes = require('./config/routes')


const $cache = document.getElementById('app-cache')

const cache = $cache.innerHTML

$cache.parentNode.removeChild($cache)


const navigation = createNavigation({ routes, cache }, (params) => {

  const { liveNodes, component, navigate, callback } = params

  const Component = require('./containers/' + component.name)

  const templateNodes = [ Component.v(component.props, component.context) ]

  const context = Object.assign({}, { navigate }, component.context)

  const $app = document.getElementById('app')

  const newLiveNodes = render($app, liveNodes, templateNodes, context)

  callback(newLiveNodes)

})

navigation.listen()
