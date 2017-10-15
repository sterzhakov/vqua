const path = require('path')

module.exports = (config) => {

  const publicPath = path.join(process.cwd(), config.publicPath)

  const containerPath = path.join(process.cwd(), config.containerPath)

  return Object.assign({}, config, {
    publicPath,
    containerPath,
    routes: config.routes,
  })

}
