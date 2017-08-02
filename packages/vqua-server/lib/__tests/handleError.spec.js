const { route } = require('vqua-router')
const request = require('request')
const initServer = require('./helpers/initServer')

let routes = []

describe('Handle error', () => {

  initServer(routes)

  it('GET /error | 500 | error message', (done) => {

    routes.push(
      route('/error', (request, response) => {

        undefinedVariable

      })
    )

    request('http://localhost:8888/error', (error, response, body) => {

      expect(response.statusCode).toBe(500)
      expect(!!body.match('undefinedVariable is not defined')).toBe(true)

      done()

    })

  })

  it('GET /error/async | 500 | error message', (done) => {

    routes.push(
      route('/error/async', async (request, response) => {

        const message = await new Promise((resolve, reject) => {

          undefinedVariable

          setTimeout(() => {

            resolve('Hello world!')

          }, 10)

        })

        response.end(message)

      })
    )

    request('http://localhost:8888/error/async', (error, response, body) => {

      expect(response.statusCode).toBe(500)
      expect(!!body.match('undefinedVariable is not defined')).toBe(true)

      done()

    })

  })


})
