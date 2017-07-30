const { TAG_TYPE } = require('vqua/lib/constants/nodeTypes')
const createNode = require('../createNode')

describe('Create node', () => {

  it('create tag node', () => {

    expect(
      createNode({
        node: 'element',
        tag: 'div',
        attr: {
          id: 1
        },
        child: []
      })
    ).toEqual({
      type: TAG_TYPE,
      tag: 'div',
      props: {
        id: 1,
      }
    })

  })

  it('create text node', () => {

    expect(
      createNode({
        node: 'text',
        text: 'test',
      })
    ).toEqual('test')

  })

  it('create null', () => {

    expect(createNode({})).toBe(null)
    expect(createNode(null)).toBe(null)
    expect(createNode()).toBe(null)
    expect(createNode(false)).toBe(null)

  })

})
