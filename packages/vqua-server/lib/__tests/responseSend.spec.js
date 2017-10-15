const { route, separateRoutes } = require('vqua-router')
const request = require('request')
const initServer = require('./helpers/initServer')
const App = require('./data/App')

const routes = [

  route('/send', (request, response) => {

    response.send(200, 'AppContainer')

  }),

  route('/send/new-layout', (request, response) => {

    response.send(200, 'AppContainer', { layout: html => `<l>${html}</l>` })

  })

]

describe('Handle send', () => {

  initServer(routes)

  it('GET /send | 200 | [layout with nodes to string]', (done) => {

    request('http://localhost:8888/send', (error, response, body) => {

      expect(response.statusCode).toBe(200)
      expect(body).toBe('<layout><p>Hello <span>world</span>!</p></layout>')

      done()

    })

  })

  it(
    'GET /send/new-layout | 200 | [new layout with nodes to string]',
    (done) => {

      request('http://localhost:8888/send/new-layout', (error, response, body) => {

        expect(response.statusCode).toBe(200)
        expect(body).toBe('<l><p>Hello <span>world</span>!</p></l>')

        done()

      })

    }
  )


})
