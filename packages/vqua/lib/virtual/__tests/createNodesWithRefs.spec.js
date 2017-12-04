const createNodesWithRefs = require('../createNodesWithRefs')

describe('Create nodes with refs', () => {

  it('return new array ob ojects with asigned instance and ref name', () => {

    expect(
      createNodesWithRefs([{ ref: 'test' }], 'instance')
    ).toEqual([
      {
        ref: {
          name: 'test',
          instance: 'instance'
        },
      }
    ])

  })

})
