const intersect = require('../intersect')

describe('Intersect', () => {

  it('return intersect values', () => {

    expect(
      intersect([1,2,3,4,5], [3,4,5,6,7])
    ).toEqual(
      [3,4,5]
    )

  })

  it('return empty array', () => {

    expect(
      intersect([1,2,3,4,5], [6,7,8,9,10])
    ).toEqual([])

  })

})
