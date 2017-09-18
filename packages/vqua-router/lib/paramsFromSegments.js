module.exports = (templateSegments, requestSegments) => {

  return templateSegments.reduce((params, templateSegment, index) => {

    const requestSegment = requestSegments[index]

    if (typeof templateSegment == 'object') {

      return Object.assign({}, params, {
        [templateSegment.key] : requestSegment
      })

    } else

    if (templateSegment[0] == ':') {

      return Object.assign({}, params, {
        [templateSegment.slice(1)] : requestSegment
      })

    }

    return params

  }, {})


}
