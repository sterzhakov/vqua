const createServer = require('../../../index')
const { initRoutes } = require('vqua-router')

module.exports = (routes) => {

  const server = createServer({
    routes: initRoutes({ routes }),
    publicPath: './lib/__tests/public',
    componentPath: './lib/__tests/containers',
    layout: html => `<layout>${html}</layout>`
  })

  beforeAll(() => {

    server.listen(8888)

  })

  afterAll(() => {

    server.close()

  })

}
