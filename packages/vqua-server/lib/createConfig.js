const path = require('path')
const { separateRoutes } = require('vqua-router')

module.exports = (config) => {

  const publicPath = path.join(process.cwd(), config.publicPath)

  const buildPath = path.join(process.cwd(), config.buildPath)

  const containerPath = path.join(process.cwd(), config.containerPath)

  const routes = separateRoutes(config.routes)

  return Object.assign({}, config, {
    publicPath,
    buildPath,
    containerPath,
    routes,
  })

}
