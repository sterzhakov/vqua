const reorderDeletedLiveNodes = require('../reorderDeletedLiveNodes')

describe('Reorder deleted live nodes', () => {

  it('1 case', () => {

    const liveNodes = [
      { order: 0 },
      { order: 1 },
      { order: 2 },
      { order: 4 },
      { order: 5 },
      { order: 3 },
    ]

    const templateNodes = [
      { order: 0 },
      { order: 1 },
      { order: 2 },
      { order: 3 },
      { order: 4 },
    ]

    const result =
      reorderDeletedLiveNodes(liveNodes, {
        templateNodes,
        offset: 0,
      })

    expect(result).toEqual([
      { order: 0 },
      { order: 1 },
      { order: 2 },
      { order: 3 },
      { order: 4 },
      { order: null }, // delete
    ])

  })

})
