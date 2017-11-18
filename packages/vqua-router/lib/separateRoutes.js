const { omit } = require('berries')

const separateRoutes = (nestedRoutes, segments = []) => {

  if (Array.isArray(nestedRoutes)) {

    return nestedRoutes.reduce((separatedRoutes, nestedRoute, index) => {

      return [
        ...separatedRoutes,
        ...separateRoutes(nestedRoute, segments)
      ]

    }, [])

  } else {

    const nestedRoute = nestedRoutes

    const newSegments = [ ...segments, ...nestedRoute.segments ]

    const separatedRoute = Object.assign({},
      nestedRoute,
      { segments: newSegments }
    )

    return [
      omit(separatedRoute, 'childs'),
      ...separateRoutes(nestedRoute.childs, newSegments)
    ]

  }

}

module.exports = separateRoutes
