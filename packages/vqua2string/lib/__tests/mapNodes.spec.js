const mapNodes = require('../mapNodes')

describe('Map nodes', () => {

  it('return new string', () => {

    const nodes = [
      {
        name: 'text 1',
        childs: []
      },
      {
        name: 'text 2',
        childs: [
          {
            name: 'text 2.1',
            childs: []
          },
        ]
      },
      {
        name: 'text 3',
        childs: []
      },
    ]

    const string = mapNodes(nodes, (node, childs) => {

      return node.name + ' ' + childs || ''

    })

    expect(string).toBe('text 1 text 2 text 2.1 text 3 ')

  })

})
