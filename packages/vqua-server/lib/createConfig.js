const path = require('path')

module.exports = (config) => {

  const publicPath = path.join(process.cwd(), config.publicPath)

  const componentPath = path.join(process.cwd(), config.componentPath)

  const componentLayoutPath = config.componentLayoutPath
    ? {
        componentLayoutPath: (
          path.join(process.cwd(), config.componentLayoutPath)
        )
      }
    : {}

  return Object.assign({}, config, componentLayoutPath, {
    publicPath,
    componentPath,
    routes: config.routes,
  })

}
