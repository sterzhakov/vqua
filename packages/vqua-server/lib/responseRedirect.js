module.exports = (request, response, { statusCode, url }) => {

  response.writeHead(statusCode, {
    'Location': url
  })

  response.end()

}
