const createNodes = require('../createNodes')

describe('Create node', () => {

  it('filter nodes', () => {

    const nodes = [
      {
        childs: [
          'some text 1',
          {
            childs: []
          },
          'some text 2'
        ],
      },
    ]

    const createNode = (node) => {

      return (typeof node == 'string')
        ? node + ' !'
        : node

    }

    const filterNodes = (nodes) => {

      return nodes.map((node) => {

        return typeof node == 'string'
          ? '! ' + node
          : node

      })

    }

    const newNodes = createNodes({ nodes, createNode, filterNodes })

    expect(newNodes).toEqual([
      {
        childs: [
          '! some text 1 !',
          {
            childs: []
          },
          '! some text 2 !'
        ],
      },
    ])

  })

  it('create new tree', () => {

    const nodes = [
      {
        childs: [
          'some text',
          {
            childs: []
          },
          'some text'
        ],
      },
    ]

    const createNode = (node) => {

      return (typeof node == 'string')
        ? [
            'hello world',
            'keep calm'
          ]
        : node

    }

    const newNodes = createNodes({ nodes, createNode })

    expect(newNodes).toEqual([
      {
        childs: [
          'hello world',
          'keep calm',
          {
            childs: []
          },
          'hello world',
          'keep calm'
        ],
      },
    ])


  })

})
