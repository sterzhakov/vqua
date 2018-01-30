const B = require('berries')
const path2segments = require('./path2segments')

const createSegments = (path) => {

  const segments = Array.isArray(path) ? path : [ path ]

  return B.flatten(

    segments.map(segment => {

      return path2segments(segment)

    })

  )

}

module.exports = createSegments
