const createRoute = require('../createRoute')
const matchRoutes = require('../matchRoutes')

describe('Match route', () => {

  it('string matcher', () => {

    const path = '/posts/2'

    const routes = [
      createRoute('/users',     'users-all'),
      createRoute('/users/:id', 'users-show'),
      createRoute('/posts',     'posts-all'),
      createRoute('/posts/:id', 'posts-show'),
    ]

    const matchedRoute = matchRoutes(routes, path)

    expect(matchedRoute).toEqual({
      path: '/posts/:id',
      segments: ['posts', ':id'],
      action: 'posts-show',
      props: {},
      childs: [],
      request: {
        path: '/posts/2',
        segments: ['posts', '2'],
        params: { id: '2' },
      }
    })

  })

  it('custom matcher', () => {

    const path = '/posts/2'

    const matcher = {
      match: (segments) => {
        return segments[1] == '2'
      },
      params: (segments) => {
        return { id: segments[1] }
      }
    }

    const routes = [
      createRoute('/users',     'users-all'),
      createRoute('/users/:id', 'users-show'),
      createRoute('/posts',     'posts-all'),
      createRoute(matcher,      'posts-show'),
    ]

    const matchedRoute = matchRoutes(routes, path)

    expect(matchedRoute).toEqual({
      props: {},
      childs: [],
      path: matcher,
      segments: matcher,
      action: 'posts-show',
      request: {
        path: '/posts/2',
        segments: ['posts', '2'],
        params: { id: '2' },
      }
    })

  })

})
