const findRightIndex = require('../findRightIndex')

describe('Find right index', () => {

  it('return number', () => {

    expect(
      findRightIndex([1,2,3,3,4,5], number => number == 4)
    ).toBe(4)

  })

})
