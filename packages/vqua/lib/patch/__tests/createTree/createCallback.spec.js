const createNode = require('../../createTree/createCallback')
const {
  TEXT_TYPE, TAG_TYPE
} = require('../../../constants/nodeTypes')

describe('Create patch node', () => {

  it('copy liveNode, templateNode, limit', () => {

    const patchNode =
      createNode({
        liveNode: {},
        templateNode: {},
        limit: 0,
      })

    expect(patchNode.liveNode).toEqual({})
    expect(patchNode.templateNode).toEqual({})
    expect(patchNode.limit).toEqual(0)

  })

  it('calculate nextLimit', () => {

    const patchNode =
      createNode({
        liveNode: {
          type: TAG_TYPE,
          props: {},
          childs: [],
        },
        templateNode: null,
        limit: 2,
      })

    expect(patchNode.nextLimit).toBe(1)

  })

  it('calculate node actions', () => {

    const patchNode =
      createNode({
        liveNode: {
          type: TAG_TYPE,
          props: {},
          childs: [],
        },
        templateNode: null,
        limit: 2,
      })

    expect(patchNode.actions.length).toBe(1)

  })

})
