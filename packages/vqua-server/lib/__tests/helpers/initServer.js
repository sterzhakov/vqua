const createServer = require('../../../index')

module.exports = (routes) => {

  const server = createServer({
    routes,
    publicPath: './lib/__tests/public',
    containerPath: './lib/__tests/containers',
    layout: html => `<layout>${html}</layout>`
  })

  beforeAll(() => {

    server.listen(8888)

  })

  afterAll(() => {

    server.close()

  })

}
