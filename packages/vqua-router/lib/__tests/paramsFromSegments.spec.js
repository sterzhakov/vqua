const paramsFromSegments = require('../paramsFromSegments')

describe('Params from segments', () => {

  it('return object with matched params', () => {

    const requestSegments = ['users','1','posts','2']

    const templateSegments = ['users',':userId','posts',':postId']

    expect(
      paramsFromSegments(templateSegments, requestSegments)
    ).toEqual({
      userId: '1',
      postId: '2'
    })

  })

})
