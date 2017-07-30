const times = require('../times')

describe('Times', () => {

  it('return array with numbers', () => {

    expect(
      times(5)
    ).toEqual([0,1,2,3,4])

  })

})
