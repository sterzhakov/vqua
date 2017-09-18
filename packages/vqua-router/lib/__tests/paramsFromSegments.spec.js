const paramsFromSegments = require('../paramsFromSegments')

describe('Params from segments', () => {

  it('return object with matched params', () => {

    const matcher = {
      key: 'postId',
      match: postId => postId == '2'
    }

    const requestSegments = ['users', '1', 'posts', '2']

    const templateSegments = ['users', ':userId', 'posts', matcher]

    expect(
      paramsFromSegments(templateSegments, requestSegments)
    ).toEqual({
      userId: '1',
      postId: '2'
    })

  })

})
