const path = require('path')
const { separateRoutes } = require('vqua-router')

module.exports = (config) => {

  const publicPath = path.join(process.cwd(), config.publicPath)

  const containerPath = path.join(process.cwd(), config.containerPath)

  const routes = separateRoutes(config.routes)

  return Object.assign({}, config, {
    publicPath,
    containerPath,
    routes,
  })

}
