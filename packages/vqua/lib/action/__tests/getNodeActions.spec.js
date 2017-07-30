const getNodeActions = require('../getNodeActions')
const {
  INSERT_NODE, CREATE_NODE, UPDATE_NODE, REPLACE_NODE, DELETE_NODE
} = require('../../constants/actionTypes')
const {
  TAG_TYPE, TEXT_TYPE
} = require('../../constants/nodeTypes')

describe('Get node actions', () => {

  it('move node', () => {

    expect(
      getNodeActions({
        liveNode: { order: 1 },
        templateNode: { order: 2 },
      })
    ).toEqual([ INSERT_NODE ])

  })

  it('create node', () => {

    expect(
      getNodeActions({
        liveNode: null,
        templateNode: {},
      })
    ).toEqual([ CREATE_NODE ])

  })

  it('update tag node', () => {

    expect(
      getNodeActions({
        liveNode: {
          type: TAG_TYPE,
        },
        templateNode: {
          type: TAG_TYPE,
        },
      })
    ).toEqual([ UPDATE_NODE ])

  })

  it('update node for text', () => {

    expect(
      getNodeActions({
        liveNode: {
          type: TEXT_TYPE,
          text: 'text',
        },
        templateNode: {
          type: TEXT_TYPE,
          text: 'text 1',
        },
      })
    ).toEqual([ UPDATE_NODE ])

  })

  it('replace node', () => {

    expect(
      getNodeActions({
        liveNode: {
          type: TAG_TYPE,
        },
        templateNode: {
          type: TEXT_TYPE,
        },
      })
    ).toEqual([ REPLACE_NODE ])

  })

  it('delete node', () => {

    expect(
      getNodeActions({
        liveNode: {},
        templateNode: null,
      })
    ).toEqual([ DELETE_NODE ])

  })

})
