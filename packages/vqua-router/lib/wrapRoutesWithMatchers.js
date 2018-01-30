const wrapRoutesWithMatchers = (routes, matchers) => {

  if (Array.isArray(routes)) {

    return routes.map(route => wrapRoutesWithMatchers(route, matchers))

  }

  const route = routes

  return {
    ...route,
    ...{
      childs: (
        route.childs
          ? wrapRoutesWithMatchers(route.childs, matchers)
          : []
      ),
      segments: route.segments.map(segment => {

        if (segment[0] == '!') {

          return matchers[segment.slice(1)]

        }

        return segment

      })
    }
  }

}

module.exports = wrapRoutesWithMatchers
