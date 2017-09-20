const path = require('path')

module.exports = (config) => {

  const publicPath = path.join(process.cwd(), config.publicPath)

  const buildPath = path.join(process.cwd(), config.buildPath)

  const containerPath = path.join(process.cwd(), config.containerPath)

  return Object.assign({}, config, { publicPath, buildPath, containerPath })

}
