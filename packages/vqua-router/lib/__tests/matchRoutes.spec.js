const route = require('../route')
const matchRoutes = require('../matchRoutes')

describe('Match route', () => {

  it('string matcher', () => {

    const path = '/posts/2'

    const routes = [
      route('/users',     'users-all'),
      route('/users/:id', 'users-show'),
      route('/posts',     'posts-all'),
      route('/posts/:id', 'posts-show'),
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

  it('custom matchers', () => {

    const path = '/posts/2'

    const matchers = [
      'posts',
      {
        key: 'id',
        match: id => id == '2',
      }
    ]

    const routes = [
      route('/users',     'users-all'),
      route('/users/:id', 'users-show'),
      route('/posts',     'posts-all'),
      route(matchers,     'posts-show'),
    ]

    const matchedRoute = matchRoutes(routes, path)

    expect(matchedRoute).toEqual({
      props: {},
      childs: [],
      path: matchers,
      segments: matchers,
      action: 'posts-show',
      request: {
        path: '/posts/2',
        segments: ['posts', '2'],
        params: { id: '2' },
      }
    })

  })

})
