const mergeNearbyStrings = require('../mergeNearbyStrings')

describe('Merge nearby strings', () => {

  it('return new array', () => {

    const items = [
      'Sample ',
      'text',
      '!',
      {},
      'Sample text',
      {},
      'Sample ',
      'text',
      '!',
    ]

    const newItems = mergeNearbyStrings(items)

    expect(newItems).toEqual([
      'Sample text!',
      {},
      'Sample text',
      {},
      'Sample text!',
    ])

  })

})
