module.exports = (
  request,
  response,
  {
    statusCode,
    redirectPath,
    params = {}
  }
) => {

  response.writeHead(statusCode, { 'Location': redirectPath })

  response.end()

}
