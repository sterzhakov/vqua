const Navigation = require('../index')
const { route, initRoutes } = require('vqua-router')

describe('Navigation', () => {

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
