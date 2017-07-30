const kindOf = require('../kindOf')

describe('Utils kind of', () => {

  it('correct type of argument', () => {
    const rules = [
      [ 'example', 'string' ],
      [ 1, 'number' ],
      [ null, 'null' ],
      [ undefined, 'undefined' ],
      [ true, 'boolean' ],
      [ {}, 'object' ],
      [ [], 'array' ],
      [ () => {}, 'function' ],
    ]

    for (const rule of rules) {
      expect(
        kindOf(rule[0])
      ).toBe(rule[1])
    }
  })

})
