module.exports = (routes) => {

  return routes.map((route) => {

    const { segments } = route

    const newSegments = segments.every(segment => segment == '')
      ? ['']
      : segments.filter(segment => segment != '')

    return Object.assign({}, route, { segments: newSegments })

  })

}
