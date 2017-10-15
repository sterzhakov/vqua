const path = require('path')

module.exports = (config) => {

  const publicPath = path.join(process.cwd(), config.publicPath)

  const componentPath = path.join(process.cwd(), config.componentPath)

  return Object.assign({}, config, {
    publicPath,
    componentPath,
    routes: config.routes,
  })

}
