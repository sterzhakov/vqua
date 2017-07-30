module.exports = (request, response) => {

  const { error } = request

  response.statusCode = 500
  
  response.end(error.message + '\n' + error.stack)

}
