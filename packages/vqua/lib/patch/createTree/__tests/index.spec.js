const createTree = require('../index')
const {
  TEXT_TYPE, TAG_TYPE
} = require('../../../constants/nodeTypes')
const {
  INSERT_NODE, CREATE_NODE, UPDATE_NODE, REPLACE_NODE, DELETE_NODE
} = require('../../../constants/actionTypes')

describe('Create patch tree', () => {

  it('update actions', () => {

    const domNodes = [
      { childs: [] },
      { childs: [] },
      { childs: [] },
      { childs: [] }
    ]

    const liveNodes = [
      {
        type: TAG_TYPE,
        tag: 'div',
        props: {},
        childs: []
      },
      {
        type: TEXT_TYPE,
        text: 'some text',
        childs: []
      },
      {
        type: TAG_TYPE,
        tag: 'div',
        props: { id: 1 },
        childs: [],
        key: 1
      },
      {
        type: TAG_TYPE,
        tag: 'p',
        props: { id: 1 },
        childs: [],
        key: 2
      },
      {
        type: TAG_TYPE,
        tag: 'p',
        props: { id: 1 },
        childs: [],
      },
    ]

    const templateNodes = [
      {
        type: TAG_TYPE,
        tag: 'p',
        props: { id: 1 },
        childs: []
      },
      {
        type: TEXT_TYPE,
        text: 'some another text',
        childs: []
      },
      {
        type: TAG_TYPE,
        tag: 'div',
        props: { id: 1 },
        key: 1,
        childs: [],
      },
      {
        type: TAG_TYPE,
        tag: 'p',
        props: { id: 1 },
        key: 3,
        childs: [],
      },
      {
        type: TAG_TYPE,
        tag: 'p',
        props: { id: 1 },
        key: 2,
        childs: [],
      },
    ]

    const patchNodes =
      createTree({
        domNodes,
        liveNodes,
        templateNodes,
      })


    expect(patchNodes[0].actions).toEqual([ REPLACE_NODE ])
    expect(patchNodes[1].actions).toEqual([ UPDATE_NODE ])
    expect(patchNodes[2].actions).toEqual([ UPDATE_NODE ])
    expect(patchNodes[3].actions).toEqual([ CREATE_NODE ])
    expect(patchNodes[4].actions).toEqual([ UPDATE_NODE ])
    expect(patchNodes[5].actions).toEqual([ DELETE_NODE ])

  })

})
