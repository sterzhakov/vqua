const reorderAddedLiveNodes = require('../reorderAddedLiveNodes')

describe('Reorder added live nodes', () => {

  it('1 case', () => {

    const liveNodes = [
      { order: 2 },
      null,
      { order: 1 },
      null,
      { order: 0 },
      null
    ]

    const templateNodes = [
      { order: 0 },
      { order: 1 },
      { order: 2 },
      { order: 3 },
      { order: 4 },
    ]

    const result =
      reorderAddedLiveNodes(liveNodes, {
        templateNodes,
      })

    expect(result).toEqual([
      { order: 2 },
      null,
      { order: 3 },
      null,
      { order: 4 },
      null
    ])

  })

})
