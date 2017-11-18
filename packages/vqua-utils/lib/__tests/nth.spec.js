const nth = require('../nth')

const items = [0,1,2,3,4,5]

describe('Nth', () => {

  it('return positive index', () => {

    expect(
      nth(items, 2)
    ).toBe(2)

  })

  it('return negative index', () => {

    expect(
      nth(items, -2)
    ).toBe(4)

  })

})
