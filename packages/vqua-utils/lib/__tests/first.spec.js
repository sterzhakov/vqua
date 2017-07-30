const first = require('../first')

describe('First', () => {

  it('element of array', () => {

    expect(
      first([1,2,3])
    ).toBe(1)

  })

})
