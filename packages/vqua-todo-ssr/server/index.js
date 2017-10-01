const createServer = require('vqua-server')
const layout = require('./layout')
const routes = require('../build/config/routes')

const app =
  createServer({
    routes,
    layout,
    publicPath: './dist',
    buildPath: './build',
    containerPath: './build/containers',
  })

app.listen(8080)
