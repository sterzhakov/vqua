const B = require('berries')
const path2segments = require('./path2segments')

module.exports = (path, action, props = {}, childs = []) => {

  const segments = (() => {

    switch (B.kindOf(path)) {

      case 'string': {

        return path2segments(path)

      }

      case 'array': {

        const pathSegments = path

        return B.flatten(
          pathSegments.map(pathSegment => {

            if (typeof pathSegment == 'string')
              return path2segments(pathSegment)

            return pathSegment

          })
        )

      }

      case 'object': {

        return path

      }

      default: {

        throw new Error('Path can be array or string. Not a ' + typeof path)

      }

    }

  })()

  return { path, action, segments, props, childs }

}
