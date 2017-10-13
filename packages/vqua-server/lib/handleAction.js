const responseSend = require('./responseSend')
const responseRedirect = require('./responseRedirect')

module.exports = (request, response, callback) => {

  response.send = (statusCode, name, params) => {

    const defaultParams = {
      props: {},
      context: {},
    }

    return (
      responseSend(
        request,
        response,
        Object.assign({}, defaultParams, params, { statusCode, name })
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
