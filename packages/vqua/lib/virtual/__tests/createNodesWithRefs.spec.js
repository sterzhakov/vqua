const createNodesWithRefs = require('../createNodesWithRefs')

describe('Create nodes with refs', () => {

  it('return new array of objects with assigned refs', () => {

    expect(
      createNodesWithRefs(
        [{ ref: 'test' }],
        'parentNodInstance',
        'coreInstance'
      )
    ).toEqual([
      {
        ref: {
          name: 'test',
          instance: 'parentNodInstance'
        },
      }
    ])

  })

})
