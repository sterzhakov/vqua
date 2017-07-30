const http = require('http')
const handleRequest = require('./lib/handleRequest')
const createConfig = require('./lib/createConfig')

const createServer = (config) => {

  return http.createServer((request, response) => {

    const newRequest = Object.assign({}, request, {
      config: createConfig(config)
    })

    handleRequest(newRequest, response)

  })

}

module.exports = createServer
