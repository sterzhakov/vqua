const separateRoutes = require('./separateRoutes')
const indexRoutes = require('./indexRoutes')
const assignControllers = require('./assignControllers')
const cleanSegments = require('./cleanSegments')
const B = require('berries')

module.exports = ({ routes, controllers = {} } = {}) => {

  return B.compose(
    cleanSegments,
    routes => assignControllers(routes, controllers),
    indexRoutes,
    separateRoutes
  )(routes)

}
