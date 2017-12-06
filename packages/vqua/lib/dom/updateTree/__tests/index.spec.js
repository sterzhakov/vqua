const updateDomTree = require('../../updateTree')
const {
  CREATE_NODE, UPDATE_NODE, DELETE_NODE, REPLACE_NODE, INSERT_NODE
} = require('../../../constants/actionTypes')
const {
  TAG_TYPE, TEXT_TYPE
} = require('../../../constants/nodeTypes')


describe('Update dom tree', () => {

  it('create node', () => {

    const parentDomNode = document.createElement('div')

    const patchNodes = [
      {
        templateNode: {
          type: TAG_TYPE,
          tag: 'div',
          props: {},
          childs: []
        },
        actions: [
          CREATE_NODE
        ],
        childs: []
      }
    ]

    updateDomTree({ patchNodes, parentDomNode })

    expect(
      parentDomNode.childNodes[0].tagName
    ).toBe('DIV')

  })

})
