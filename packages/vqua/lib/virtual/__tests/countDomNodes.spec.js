const countDomNodes = require('../countDomNodes')
const {
  TEXT_TYPE, TAG_TYPE, CLASS_TYPE, INSTANCE_TYPE
} = require('../../constants/nodeTypes')

describe('Count dom nodes for', () => {

  it('null', () => {

    expect(
      countDomNodes([null])
    ).toBe(0)

  })

  it('text', () => {

    expect(
      countDomNodes([{ type: TEXT_TYPE, text: 'Hello world' }])
    ).toBe(1)

  })

  it('tag', () => {

    expect(
      countDomNodes([{ type: TAG_TYPE, tag: 'div' }])
    ).toBe(1)

  })

  it('object', () => {

    expect(
      countDomNodes([{ type: INSTANCE_TYPE, childDomNodesCount: 1 }])
    ).toBe(1)

  })

  it('multiple nodes', () => {

    expect(
      countDomNodes([
        null,
        { type: TEXT_TYPE },
        { type: TAG_TYPE },
        { type: INSTANCE_TYPE, childDomNodesCount: 1 },

      ])
    ).toBe(3)

  })

})
