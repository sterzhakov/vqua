const createServer = require('../../../index')

module.exports = (routes) => {

  const server = createServer({
    routes,
    publicPath: './__tests/public',
    layout: html => `<layout>${html}</layout>`
  })

  beforeAll(() => {

    server.listen(8080)

  })

  afterAll(() => {

    server.close()

  })

}
