const indexRoutes = require('./indexRoutes')
const assignControllers = require('./assignControllers')
const cleanSegments = require('./cleanSegments')
const separateRoutes = require('./separateRoutes')
const wrapRoutesWithMatchers = require('./wrapRoutesWithMatchers')
const B = require('berries')

module.exports = ({ routes, controllers = {}, matchers = {} } = {}) => {

  return B.compose(
    cleanSegments,
    routes => assignControllers(routes, controllers),
    routes => wrapRoutesWithMatchers(routes, matchers),
    indexRoutes,
    separateRoutes,
  )(routes)

}
