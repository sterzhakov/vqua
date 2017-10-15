const indexRoutes = require('../indexRoutes')

it('indexRoutes()', () => {

  const routes = [
    {},
    {},
    {},
  ]

  expect(
    indexRoutes(routes)
  ).toEqual([
    { index: 0 },
    { index: 1 },
    { index: 2 },
  ])

})
