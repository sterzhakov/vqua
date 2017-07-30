const convertTag = require('../convertTag')
const { TAG_TYPE } = require('vqua/lib/constants/nodeTypes')

describe('Convert tag', () => {

  it('return new object', () => {

    const tag = document.createElement('div')
    tag.setAttribute('class', 'class')
    tag.setAttribute('id', 'id')

    const newNode = convertTag(tag)

    expect(newNode).toEqual({
      type: TAG_TYPE,
      tag: 'div',
      props: {
        id: 'id',
        class: 'class',
      },
    })

  })

})
