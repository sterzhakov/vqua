const flatten = require('..//flatten')

describe('Utils', () => {

  it('flatten array', () => {

    expect(
      flatten([1,2,[3,4,[5,6],[7]],8])
    ).toEqual(
      [1,2,3,4,5,6,7,8]
    )

  })

})
