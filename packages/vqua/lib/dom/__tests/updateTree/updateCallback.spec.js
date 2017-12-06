const updateNode = require('../../updateTree/updateCallback')
const {
  CREATE_NODE, UPDATE_NODE, DELETE_NODE, REPLACE_NODE, INSERT_NODE
} = require('../../../constants/actionTypes')
const {
  TAG_TYPE, TEXT_TYPE
} = require('../../../constants/nodeTypes')

describe('Update dom callback', () => {

  it('create node', () => {

    const parentDomNode = document.createElement('div')

    const actions = [ CREATE_NODE ]

    const instance = { refs: {} }

    const templateNode = {
      type: TAG_TYPE,
      tag: 'div',
      props: { id: 1 },
      childs: [],
      ref: {
        name: 'div',
        instance,
      }
    }

    const newDomNode =
      updateNode({ actions, templateNode, parentDomNode })

    expect(
      parentDomNode.childNodes[0].isSameNode(newDomNode)
    ).toBeTruthy()

    expect(
      instance.refs.div.isSameNode(newDomNode)
    ).toBe(true)


  })

  it('update text node', () => {

    const actions = [ UPDATE_NODE ]

    const domNode = document.createTextNode('text')

    const liveNode = {
      type: TEXT_TYPE,
      text: 'text',
      dom: domNode,
    }

    const templateNode = {
      type: TEXT_TYPE,
      text: 'text2',
    }

    const newDomNode = updateNode({ actions, templateNode, liveNode })

    expect(
      newDomNode.isSameNode(domNode)
    ).toBeTruthy()

    expect(newDomNode.nodeValue).toBe('text2')

  })

  it('update tag node', () => {

    const instance = { refs: {} }

    const actions = [ UPDATE_NODE ]

    const domNode = document.createElement('div')

    domNode.setAttribute('id', '1')

    const liveNode = {
      type: TAG_TYPE,
      tag: 'div',
      props: { id: 1 },
      childs: [],
      dom: domNode,
    }

    const templateNode = {
      type: TAG_TYPE,
      tag: 'div',
      props: { id: 2 },
      ref: {
        name: 'div',
        instance,
      },
      childs: [],
    }

    const newDomNode = updateNode({ actions, templateNode, liveNode })

    expect(
      newDomNode.isSameNode(domNode)
    ).toBeTruthy()

    expect(newDomNode.id).toBe('2')

    expect(
      instance.refs.div.isSameNode(domNode)
    ).toBe(true)

  })

  it('delete node', () => {

    const actions = [ DELETE_NODE ]

    const parentDomNode = document.createElement('div')

    const domNode = document.createElement('span')

    parentDomNode.appendChild( domNode )

    const liveNode = {
      type: TAG_TYPE,
      tag: 'span',
      props: { id: 1, onClick: () => {} },
      childs: [],
      dom: domNode,
    }

    const newDomNode = updateNode({ actions, liveNode, parentDomNode })

    expect(parentDomNode.childNodes.length).toBe(0)

  })

  it('delete node with it ref', () => {

    const instance = { refs: { span: {} } }

    const actions = [ DELETE_NODE ]

    const parentDomNode = document.createElement('div')

    const domNode = document.createElement('span')

    parentDomNode.appendChild( domNode )

    const liveNode = {
      type: TAG_TYPE,
      tag: 'span',
      props: { id: 1, onClick: () => {} },
      childs: [],
      dom: domNode,
      ref: {
        instance,
        name: 'span',
      }
    }

    const newDomNode = updateNode({ actions, liveNode, parentDomNode })

    expect(instance.refs.span).toBeUndefined()

  })

  it('replace node', () => {

    const parentDomNode = document.createElement('div')

    const oldDomNode = document.createElement('div')

    parentDomNode.appendChild( oldDomNode )

    const actions = [ REPLACE_NODE ]

    const liveNode = {
      type: TAG_TYPE,
      tag: 'div',
      props: {},
      childs: [],
      dom: oldDomNode
    }

    const templateNode = {
      type: TAG_TYPE,
      tag: 'span',
      props: {},
      childs: []
    }

    const newDomNode =
      updateNode({
        actions,
        templateNode,
        liveNode,
        parentDomNode
      })

    expect(newDomNode.tagName).toBe('SPAN')

  })

  it('replace node with add ref', () => {

    const parentDomNode = document.createElement('div')

    const oldDomNode = document.createElement('div')

    parentDomNode.appendChild( oldDomNode )

    const instance = { ref: {} }

    const actions = [ REPLACE_NODE ]

    const liveNode = {
      type: TAG_TYPE,
      tag: 'div',
      props: {},
      childs: [],
      dom: oldDomNode
    }

    const templateNode = {
      type: TAG_TYPE,
      tag: 'span',
      props: {},
      childs: [],
      ref: {
        name: 'span',
        instance
      },
    }

    const newDomNode =
      updateNode({
        actions,
        templateNode,
        liveNode,
        parentDomNode
      })

    expect(
      instance.refs.span.tagName
    ).toBe('SPAN')

  })

  it('replace node with remove ref', () => {

    const parentDomNode = document.createElement('div')

    const oldDomNode = document.createElement('div')

    parentDomNode.appendChild( oldDomNode )

    const instance = { refs: { div: document.createElement('div') } }

    const actions = [ REPLACE_NODE ]

    const liveNode = {
      type: TAG_TYPE,
      tag: 'div',
      props: {},
      childs: [],
      dom: oldDomNode,
      ref: {
        name: 'div',
        instance,
      }
    }

    const templateNode = {
      type: TAG_TYPE,
      tag: 'span',
      props: {},
      childs: [],
    }

    const newDomNode =
      updateNode({
        actions,
        templateNode,
        liveNode,
        parentDomNode
      })

    expect(
      instance.refs.div
    ).toBeUndefined()

  })

  it('insert node', () => {

    const parentDomNode = document.createElement('div')

    const oldDomNode = document.createElement('span')

    const actions = [ INSERT_NODE ]

    const liveNode = {
      type: TAG_TYPE,
      tag: 'span',
      props: {},
      childs: [],
      dom: oldDomNode,
      order: 0
    }

    const templateNode = { order: 0 }

    const insertedNode =
      updateNode({ actions, parentDomNode, liveNode, templateNode })

    expect(
      parentDomNode.childNodes[0].isSameNode(insertedNode)
    ).toBeTruthy()

    expect(
      insertedNode.isSameNode(oldDomNode)
    ).toBeTruthy()

  })

  it('nothing actions', () => {

    const actions = []

    expect(
      updateNode({ actions })
    ).toBeNull()


  })

  it('unknow action node', () => {

    const JAMES_BOND = '007'

    const actions = [ JAMES_BOND ]

    expect(
      () => { updateNode({ actions }) }
    ).toThrowError()

  })


})
