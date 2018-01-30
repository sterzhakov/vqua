const createSegments = require('./createSegments')

const scope = (path, ...childs) => {

  const scopeSegments = createSegments(path)

  return childs.map(route => {

    return {
      ...route,
      ...{
        segments: [
          ...scopeSegments,
          ...route.segments,
        ]
      }
    }

  })

}

module.exports = scope
