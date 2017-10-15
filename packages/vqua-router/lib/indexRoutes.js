module.exports = (routes) => {

  return routes.map((route, index) => {

    return Object.assign({}, route, { index })

  })

}
