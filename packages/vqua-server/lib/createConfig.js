const path = require('path')

module.exports = (config) => {

  const publicPath = path.join(process.cwd(), config.publicPath)
  const buildPath = path.join(process.cwd(), config.buildPath)

  return Object.assign({}, {
    routes: config.routes,
    publicPath,
    buildPath,
    layout: config.layout
  })

}
