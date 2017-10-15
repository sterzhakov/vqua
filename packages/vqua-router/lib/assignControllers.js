const assignHandlers = (routes, controllers) => {

  return routes.map(route => {

    if (typeof route.action != 'string') return route

    const parsedAction = route.action.split('#')

    const controller = {
      name: parsedAction[0] + 'Controller',
      action: parsedAction[1]
    }

    return Object.assign({}, route, {
      controller: controllers[controller.name],
      action: controllers[controller.name][controller.action],
    })

  })

}

module.exports = assignHandlers
