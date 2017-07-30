const pick = require('..//pick')

describe('Utils pick', () => {

  it('new object by compared keys', () => {
    expect(
      pick({ a: 'a', b: 'b', c: 'c' }, 'a', 'c')
    ).toEqual(
      { a: 'a', c: 'c' }
    )
  })

})
