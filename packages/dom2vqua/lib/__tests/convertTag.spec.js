const convertTag = require('../convertTag')
const { TAG_TYPE } = require('vqua/lib/constants/nodeTypes')

describe('Convert tag', () => {

  it('return new object', () => {

    const tag = document.createElement('div')
    tag.setAttribute('class', 'class')
    tag.setAttribute('id', 'id')
    tag.setAttribute('data-vqua-key', '1')

    const newNode = convertTag(tag)

    expect(newNode).toEqual({
      dom: tag,
      type: TAG_TYPE,
      tag: 'div',
      key: '1',
      props: {
        id: 'id',
        class: 'class',
        'data-vqua-key': '1',
      },
    })

  })

})
