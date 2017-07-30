const filterNodesOffsets = require('../filterNodesOffsets')

describe('Filter nodes offsets', () => {

  it('return array of numbers', () => {
    expect(
      filterNodesOffsets([
        {},
        { offset: 0 },
        { offset: 1 },
        { offset: 2 },
      ])
    ).toEqual([0,1,2])

  })

})
