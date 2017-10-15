const responseSend = require('./responseSend')
const responseRedirect = require('./responseRedirect')

module.exports = (request, response, next, callback) => {

  response.send = (statusCode, name, params = {}) => {

    const newParams =
      Object.assign({},
        {
          props: {},
          context: {},
          statusCode,
          name
        },
        params,
      )

    responseSend(request, response, newParams)

  }

  response.redirect = (statusCode, url, params = {}) => {

    const newParams =
      Object.assign({},
        {
          statusCode,
          url
        },
        params
      )

    responseRedirect(request, response, newParams)

  }

  try {

    // call hooks

    const result = request.action(request, response, next)

    if (result instanceof Promise) {

      result.catch(callback)

    }

  } catch(error) {

    callback(error)

  }


}
