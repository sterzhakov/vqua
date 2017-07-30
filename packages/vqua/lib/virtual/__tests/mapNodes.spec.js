const mapNodes = require('../mapNodes')

describe('Map nodes', () => {

  it('return new tree of nodes', () => {

    const nodes = [
      {
        id: 1,
        childs: [
          {
            id: 2,
            childs: [],
          },
          'some text',
          {
            id: 3,
            childs: [],
          },
        ]
      }
    ]

    const newNodes = mapNodes(nodes, (node) => {

      return Object.assign({}, node, { id: node.id * 2 })

    })

    expect(newNodes).toEqual([
      {
        id: 2,
        childs: [
          {
            id: 4,
            childs: [],
          },
          'some text',
          {
            id: 6,
            childs: [],
          },
        ]
      }
    ])

  })

})
