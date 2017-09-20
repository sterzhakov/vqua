const responseSend = require('./responseSend')
const responseRedirect = require('./responseRedirect')

module.exports = (request, response, callback) => {

  response.send = (statusCode, name, props = {}, params = {}) => {

    return (
      responseSend(
        request,
        response,
        Object.assign({}, params, { statusCode, name, props })
      )
    )

  }

  response.redirect = (statusCode, url) => {
    return responseRedirect(request, response, { statusCode, url })
  }

  try {

    const result = request.action(request, response)

    if (result instanceof Promise) {

      result.catch(callback)

    }

  } catch(error) {

    callback(error)

  }


}
