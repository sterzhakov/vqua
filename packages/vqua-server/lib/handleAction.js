const responseSend = require('./responseSend')
const responseRedirect = require('./responseRedirect')

module.exports = (request, response, next, callback) => {

  response.send = (statusCode, componentName, params = {}) => {

    const newParams = Object.assign({}, params, {
      statusCode,
      componentName,
      params: Object.assign({},
        params.props   ? {} : { props:   {} },
        params.context ? {} : { context: {} },
      )
    })

    responseSend(request, response, newParams)

  }

  response.redirect = (statusCode, redirectPath, params = {}) => {

    const newParams = {
      statusCode,
      redirectPath,
      params
    }

    responseRedirect(request, response, newParams)

  }

  try {

    // call hooks

    const result = request.action(request, response, next)

    if (result instanceof Promise) result.catch(callback)

  } catch(error) {

    callback(error)

  }


}
