const range = require('../range')

describe('range', () => {

  it('create array from -3 to 3', () => {

    expect(
      range(-3,3)
    ).toEqual(
      [-3,-2,-1,0,1,2,3]
    )

  })

  it('create array from 3 to -3', () => {

    expect(
      range(3, -3)
    ).toEqual(
      [3, 2, 1, 0, -1, -2, -3]
    )

  })

  it('create array from 3 to 3', () => {

    expect(
      range(3, 3)
    ).toEqual(
      [3]
    )

  })

})
