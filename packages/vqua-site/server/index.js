const createServer = require('vqua-server')
const layout = require('./layout')
const routes = require('../build/config/routes')

const app = createServer({ routes, layout, publicPath: './dist' })

app.listen(8080)
