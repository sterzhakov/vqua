const div = require('./__data/div')
const mapNodes = require('../mapNodes')

describe('Map dom nodes', () => {

  it('return array', () => {

    const TAG_TYPE = 1

    const TEXT_TYPE = 3

    const newNodes = mapNodes(div.childNodes, (node) => {

      return (node.nodeType == TAG_TYPE) ? { type: 'tag' } : 'text'

    })

    expect(newNodes).toEqual([
      'text',
      {
        type: 'tag',
        childs: [
          'text',
        ],
      },
      'text',
    ])

  })

})
