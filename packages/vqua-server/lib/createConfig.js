const path = require('path')

module.exports = (config) => {

  const publicPath = path.join(process.cwd(), config.publicPath)

  return Object.assign({}, {
    routes: config.routes,
    publicPath,
    layout: config.layout
  })

}
