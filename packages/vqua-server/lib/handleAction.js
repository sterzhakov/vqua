const responseSend = require('./responseSend')
const responseRedirect = require('./responseRedirect')

module.exports = (request, response, callback) => {

  response.send = (nodes, params) => {
    return responseSend(request, response, Object.assign({}, { nodes }, params))
  }

  response.redirect = (statusCode, url) => {
    return responseRedirect(request, response, { statusCode, url })
  }

  try {

    request.action(request, response).catch(callback)

  } catch(error) {

    callback(error)

  }


}
