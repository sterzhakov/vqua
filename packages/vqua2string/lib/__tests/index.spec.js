const { TAG_TYPE, TEXT_TYPE } = require('vqua/lib/constants/nodeTypes')
const vqua2string = require('../index')

describe('Convert vqua nodes to string', () => {

  it('return new string', () => {

    const nodes = [
      {
        type: TAG_TYPE,
        tag: 'div',
        props: { id: 'test', class: 'test' },
        childs: [
          {
            type: TEXT_TYPE,
            text: 'text 1',
            childs: [],
          },
          {
            type: TAG_TYPE,
            tag: 'span',
            props: {},
            childs: [
              {
                type: TEXT_TYPE,
                text: 'text 2',
                childs: [],
              },
            ]
          },
          {
            type: TEXT_TYPE,
            text: 'text 3',
            childs: [],            
          },
        ]
      }
    ]

    const string = vqua2string(nodes)

    expect(string).toBe(
      '<div id="test" class="test">' +
        'text 1' +
        '<span>text 2</span>' +
        'text 3' +
      '</div>'
    )

  })

})
