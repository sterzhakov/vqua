const separateRoutes = require('./separateRoutes')
const indexRoutes = require('./indexRoutes')
const assignControllers = require('./assignControllers')

module.exports = ({ routes, controllers = {} } = {}) => {

  const separatedRoutes = separateRoutes(routes)

  const indexedRoutes = indexRoutes(separatedRoutes)

  const actionedRoutes = assignControllers(indexedRoutes, controllers)

  return actionedRoutes

}
