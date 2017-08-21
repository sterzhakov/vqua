const div = require('./__data/div')
const { TAG_TYPE, TEXT_TYPE } = require('vqua/lib/constants/nodeTypes')
const dom2vqua = require('../index')

describe('Convert dom to vqua', () => {

  it('return new object', () => {

    const newNode = dom2vqua(div)

    expect(newNode).toEqual({
      type: TAG_TYPE,
      tag: 'div',
      props: {},
      dom: div,
      childs: [
        {
          dom: div.childNodes[0],
          type: TEXT_TYPE,
          text: 'text 1',
          childs: [],
        },
        {
          dom: div.childNodes[1],
          type: TAG_TYPE,
          tag: 'span',
          props: {
            id: 'id',
            class: 'class',
          },
          childs: [
            {
              dom: div.childNodes[1].childNodes[0],
              type: TEXT_TYPE,
              text: 'text 2',
              childs: [],
            }
          ]
        },
        {
          dom: div.childNodes[2],
          type: TEXT_TYPE,
          text: 'text 3',
          childs: [],
        }
      ]
    })

  })

})
