const route = require('../createRoute')
const initRoutes = require('../initRoutes')

it('initRoutes()', () => {

  class ExampleController { index() { return 'example' } }

  class SampleController { index() { return 'sample' } }

  const exampleController = new ExampleController

  const sampleController = new SampleController

  const controllers = {
    ExampleController: exampleController,
    SampleController: sampleController,
  }

  const routes = [
    route('/','Example#index', {},
      route('/','Sample#index')
    )
  ]

  const newRoutes = initRoutes({ routes, controllers })

  expect(newRoutes[0].controller instanceof ExampleController).toBeTruthy()
  expect(newRoutes[0].action).toEqual(exampleController.index)
  expect(newRoutes[0].index).toEqual(0)

  expect(newRoutes[1].controller instanceof SampleController).toBeTruthy()
  expect(newRoutes[1].action).toEqual(sampleController.index)
  expect(newRoutes[1].index).toEqual(1)

  expect(newRoutes.length).toBe(2)

})
