const { route } = require('vqua-router')
const request = require('request')
const initServer = require('./helpers/initServer')
const App = require('./data/App')

const routes = [

  route('/redirect', (request, response) => {

    response.redirect(302, '/hello-world')

  })

]

describe('Handle action', () => {

  initServer(routes)

  it('GET /redirect | 302', (done) => {

    request({
      url: 'http://localhost:8888/redirect',
      followRedirect: false,
    }, (error, response, body) => {

      expect(response.statusCode).toBe(302)
      expect(response.headers.location).toBe('/hello-world')

      done()

    })

  })

})
