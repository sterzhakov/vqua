const Navigation = require('../index')
const { route, initRoutes } = require('vqua-router')

describe('Navigation', () => {

  it('on redirect', (done) => {

    class PostsController {

      index(request, response) {

        response.redirect(301, '/home')

      }

    }

    const routes = [
      route('/posts', 'Posts#index')
    ]

    const controllers = {
      PostsController: new PostsController
    }

    const initedRoutes = initRoutes({ routes, controllers })

    const navigation = new Navigation(initedRoutes)

    navigation.onRedirect((params) => {

      expect(params).toEqual({
        path: '/posts',
        statusCode: 301,
        params: {}
      })

      done()

    })

    navigation.navigate('/posts')

  })

  it('next route', (done) => {

    class PostsController {

      first(request, response, next) {

        next()

      }

      second(request, response) {

        response.send(200, 'SecondContainer')

      }

    }

    const routes = [
      route('/posts', 'Posts#first'),
      route('/posts', 'Posts#second'),
    ]

    const controllers = {
      PostsController: new PostsController
    }

    const initedRoutes = initRoutes({ routes, controllers })

    const navigation = new Navigation(initedRoutes)

    navigation.onNavigate((params) => {

      expect(params.componentName).toBe('SecondContainer')

      done()

    })

    navigation.navigate('/posts')

  })

  it('process route from cache', (done) => {

    class PostsController {}

    const routes = [
      route('/posts/:id', 'Posts#index')
    ]

    const controllers = {
      PostsController: new PostsController
    }

    const initedRoutes = initRoutes({ routes, controllers })

    const navigation = new Navigation(initedRoutes)

    navigation.onNavigate((params) => {

      expect(params).toEqual({
        path: '/posts/2',
        statusCode: 200,
        componentName: 'PostsContainer',
        params: {
          props: { name: 'test' },
          context: { name: 'test' },
        }
      })

      done()

    })

    const cache = JSON.stringify({
      path: '/posts/2',
      statusCode: 200,
      componentName: 'PostsContainer',
      params: {
        props: { name: 'test' },
        context: { name: 'test' },
      }
    })

    navigation.navigate('/posts/2', cache)

  })

  it('Navigate for similar path, prevent navigate', () => {

    const routes = [
      route('/example', () => {}),
    ]

    const navigation = new Navigation(routes)

    expect(
      navigation.navigate('/example') instanceof Promise
    ).toBe(true)

    expect(
      navigation.navigate('/example')
    ).toBe(false)

    expect(
      navigation.navigate('/another-example') instanceof Promise
    ).toBe(true)

  })

  it('Navigate for similar path, allow navigate', () => {

    const routes = [
      route('/example', () => {}),
    ]

    const navigation = new Navigation(routes)

    navigation.onNavigate((path, nextPath) => {

      return true

    })

    expect(
      navigation.navigate('/example') instanceof Promise
    ).toBe(true)

    expect(
      navigation.navigate('/example') instanceof Promise
    ).toBe(false)

  })

  it('process route', (done) => {

    class PostsController {

      index(request, response) {

        expect(request.params.id).toBe('2')

        response.send(200, 'PostsContainer', {
          props: { name: 'test' },
          context: { name: 'test' }
        })

      }

    }

    const routes = [
      route('/posts/:id', 'Posts#index')
    ]

    const controllers = {
      PostsController: new PostsController
    }

    const initedRoutes = initRoutes({ routes, controllers })

    const navigation = new Navigation(initedRoutes)

    navigation.onNavigate((params) => {

      expect(params).toEqual({
        path: '/posts/2',
        statusCode: 200,
        componentName: 'PostsContainer',
        params: {
          props: { name: 'test' },
          context: { name: 'test' },
        }
      })

      done()

    })

    navigation.navigate('/posts/2')

  })

})
