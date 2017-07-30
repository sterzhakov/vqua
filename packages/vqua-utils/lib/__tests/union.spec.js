const union = require('..//union')

describe('Utils union', () => {

  it('merge 2 array into one with uniqe values', () => {

    expect(
      union([1,2,3,4,5],[3,4,5,6,7])
    ).toEqual(
      [1,2,3,4,5,6,7]
    )

  })

})
