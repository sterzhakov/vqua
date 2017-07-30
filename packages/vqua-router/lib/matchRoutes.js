const matchSegments = require('./matchSegments')
const path2segments = require('./path2segments')
const paramsFromSegments = require('./paramsFromSegments')

module.exports = (routes, path) => {

  const segments = path2segments(path)

  const route = routes.find((route) => {

    return matchSegments(route.segments, segments)

  })

  if (!route) return false

  const params = Array.isArray(route.segments)
    ? paramsFromSegments(route.segments, segments)
    : route.segments.params(segments)


  const request = {
    request: {
      path,
      segments,
      params
    }
  }

  return Object.assign({}, route, request)

}
