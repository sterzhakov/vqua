const matchSegments = require('./matchSegments')
const path2segments = require('./path2segments')
const paramsFromSegments = require('./paramsFromSegments')
const filterPath = require('./filterPath')

module.exports = (routes, path) => {

  const filteredPath = filterPath(path)

  const segments = path2segments(filteredPath)

  const route = routes.find((route) => {

    return matchSegments(route.segments, segments)

  })

  if (!route) return false

  const params = paramsFromSegments(route.segments, segments)

  const request = {
    request: {
      path: filteredPath,
      segments,
      params
    }
  }

  return Object.assign({}, route, request)

}
