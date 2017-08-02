const { route } = require('vqua-router')
const request = require('request')
const initServer = require('./helpers/initServer')

let routes = []

describe('Handle action', () => {

  initServer(routes)

  it('GET /test.txt | 200 | Hello world!', (done) => {

    request('http://localhost:8888/test.txt', (error, response, body) => {

      expect(response.statusCode).toBe(200)
      expect(body).toBe('Hello world!\n')
      expect(response.headers.contenttype).toBe('text/plain; charset=utf-8')

      done()

    })

  })

  it('GET ../../../test.txt | 200 | Hello world!', (done) => {

    request('http://localhost:8888/../../../test.txt', (error, response, body) => {

      expect(response.statusCode).toBe(200)
      expect(body).toBe('Hello world!\n')
      expect(response.headers.contenttype).toBe('text/plain; charset=utf-8')

      done()

    })

  })


  it('GET /test.txt => /:filename | 200 | Hello world!', (done) => {

    routes.push(
      route('/:filename', (request, response) => {

        response.end('Hello world!')

      })
    )

    request('http://localhost:8888/test.txt', (error, response, body) => {

      expect(body).toBe('Hello world!\n')
      expect(response.headers.contenttype).toBe('text/plain; charset=utf-8')

      routes.pop()

      done()

    })

  })

})
