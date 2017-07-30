const div = require('./__data/div')
const { TAG_TYPE } = require('vqua/lib/constants/nodeTypes')
const dom2vqua = require('../index')

describe('Convert dom to vqua', () => {

  it('return new object', () => {

    const newNode = dom2vqua(div)

    expect(newNode).toEqual({
      type: TAG_TYPE,
      tag: 'div',
      props: {},
      childs: [
        'text 1',
        {
          type: TAG_TYPE,
          tag: 'span',
          props: {
            id: 'id',
            class: 'class',
          },
          childs: [
            'text 2'
          ]
        },
        'text 3',
      ]
    })

  })

})
