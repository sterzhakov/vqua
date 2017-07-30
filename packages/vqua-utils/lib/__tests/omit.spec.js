const omit = require('..//omit')

describe('Utils omit', () => {

  it('new object by not compared keys', () => {
    expect(
      omit({ a: 'a', b: 'b', c: 'c' }, 'a', 'c')
    ).toEqual(
      { b: 'b' }
    )
  })

})
