const request = require('request')
const initServer = require('./helpers/initServer')
const { route } = require('vqua-router')

const routes = [

  route('/hello', (request, response) => {

    response.end('Hello world!')

  }),

  route('/hello/async', async (request, response) => {

    const message = await new Promise((resolve, reject) => {

      setTimeout(() => {

        resolve('Hello world!')

      }, 10)

    })

    response.end(message)

  }),

  route('/hello/:name', (request, response) => {

    response.end(
      JSON.stringify({ name: request.params.name.toString() })
    )

  }),

  route('/next/:id', (request, response, next) => {

    next()

  }),

  route('/next/:id', (request, response, next) => {

    response.end('after-next')

  })

]


describe('Handle action', () => {

  initServer(routes)

  it('GET /hello | 200 | Hello world!', (done) => {

    request('http://localhost:8888/hello', (error, response, body) => {

      expect(response.statusCode).toBe(200)
      expect(body).toBe('Hello world!')

      done()

    })

  })

  it('GET /hello/async | 200 | Hello world!', (done) => {

    request('http://localhost:8888/hello/async', (error, response, body) => {

      expect(response.statusCode).toBe(200)
      expect(body).toBe('Hello world!')

      done()

    })

  })

  it('GET /hello/:name | 200 | {"name":"world"}', (done) => {

    request('http://localhost:8888/hello/world', (error, response, body) => {

      expect(response.statusCode).toBe(200)
      expect(body).toBe('{"name":"world"}')

      done()

    })

  })

  it('GET /next/:id | 200', (done) => {

    request('http://localhost:8888/next/2', (error, response, body) => {

      expect(response.statusCode).toBe(200)
      expect(body).toBe('after-next')

      done()

    })

  })


})
