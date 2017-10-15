module.exports = (request, response, { statusCode, url, params = {} }) => {

  response.writeHead(statusCode, { 'Location': url })

  response.end()

}
