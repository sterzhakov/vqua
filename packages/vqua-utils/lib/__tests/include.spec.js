const include = require('..//include')

describe('Utils in array', () => {

  it('return true when value in array', () => {

    expect(
      include([1,2,3,4,5], 3)
    ).toBe(true)

  })

})
