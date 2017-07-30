const { route } = require('vqua-router')
const request = require('request')
const initServer = require('./helpers/initServer')

let routes = []

describe('Handle action', () => {

  initServer(routes)

  it('GET /hello | 200 | Hello world!', (done) => {

    routes.push(
      route('/hello', (request, response) => {

        response.end('Hello world!')

      })
    )

    request('http://localhost:8080/hello', (error, response, body) => {

      expect(response.statusCode).toBe(200)
      expect(body).toBe('Hello world!')

      done()

    })

  })

  it('GET /hello/async | 200 | Hello world!', (done) => {

    routes.push(
      route('/hello/async', async (request, response) => {

        const message = await new Promise((resolve, reject) => {

          setTimeout(() => {

            resolve('Hello world!')

          }, 10)

        })

        response.end(message)

      })
    )

    request('http://localhost:8080/hello/async', (error, response, body) => {

      expect(response.statusCode).toBe(200)
      expect(body).toBe('Hello world!')

      done()

    })

  })

  it('GET /hello/:name | 200 | {"name":"world"}', (done) => {

    routes.push(
      route('/hello/:name', (request, response) => {

        response.end(
          JSON.stringify({ name: request.params.name.toString() })
        )

      })
    )

    request('http://localhost:8080/hello/world', (error, response, body) => {

      expect(response.statusCode).toBe(200)
      expect(body).toBe('{"name":"world"}')

      done()

    })

  })

})
