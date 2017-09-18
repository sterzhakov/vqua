module.exports = (templateSegments, requestSegments) => {

  if (
    templateSegments.length == 1 &&
    templateSegments[0] == '*'
  ) return true

  if (templateSegments.length != requestSegments.length) return false

  return templateSegments.every((templateSegment, index) => {

    const requestSegment = requestSegments[index]

    if (typeof templateSegment == 'object') {

      return templateSegment.match(requestSegment)

    } else

    if (templateSegment[0] == ':') {

      return true

    } else

    if (templateSegment == requestSegment) {

      return true

    } else {

      return false

    }

  })

}
