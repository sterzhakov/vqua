const createNodesWithRefs = require('../createNodesWithRefs')

describe('Create nodes with refs', () => {

  it('return new array of objects with assigned refs', () => {

    expect(
      createNodesWithRefs(
        [{ ref: 'test' }],
        'parentNodeInstance',
        'coreInstance'
      )
    ).toEqual([
      {
        ref: {
          name: 'test',
          instance: 'parentNodeInstance'
        },
      }
    ])

  })

})
