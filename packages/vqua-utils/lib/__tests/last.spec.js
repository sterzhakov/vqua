const last = require('../last')

describe('Last', () => {

  it('element of array', () => {

    expect(
      last([1,2,3])
    ).toBe(3)

  })

})
