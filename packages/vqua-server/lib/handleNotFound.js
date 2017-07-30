module.exports = (request, response) => {

  response.statusCode = 404
  response.end('<h1>Error 404</h2> \n <p>Page not found!</p>')

}
