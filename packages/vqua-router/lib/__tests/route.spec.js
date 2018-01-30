const route = require('../route')

describe('route()', () => {

  it('object with segments, path, action', () => {

    expect(
      route('/posts/:id', 'posts-show')
    ).toEqual({
      segments: ['posts', ':id'],
      path: '/posts/:id',
      action: 'posts-show',
      props: {},
      childs: []
    })

  })

  it('object and convert array strings to path segments', () => {

    expect(
      route(['/posts/:id'], 'posts-show')
    ).toEqual({
      segments: ['posts', ':id'],
      path: ['/posts/:id'],
      action: 'posts-show',
      props: {},
      childs: []
    })

  })

})
