const { TAG_TYPE } = require('vqua/lib/constants/nodeTypes')
const vquaReplace = require('../index')

describe('Vqua replace', () => {

  it('return new nodes', () => {

    const nodes = [
      {
        type: TAG_TYPE,
        tag: 'div',
        props: {},
        childs: [
          'Hello {{ name }}, from {{ author }}!',
        ]
      }
    ]

    const replacedNodes =
      vquaReplace(nodes, {
        name: 'stranger',
        author: {
          type: TAG_TYPE,
          tag: 'span',
          props: {},
          childs: [
            'sun'
          ],
        }
      })

    expect(replacedNodes).toEqual([
      {
        type: TAG_TYPE,
        tag: 'div',
        props: {},
        childs: [
          'Hello stranger, from ',
          {
            type: TAG_TYPE,
            tag: 'span',
            props: {},
            childs: [
              'sun'
            ],
          },
          '!',
        ]
      }
    ])

  })

})
