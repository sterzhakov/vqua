const createNode = require('../../createNode/index')
const Component = require('../../Component')


const {
  ROOT_TYPE, CLASS_TYPE, INSTANCE_TYPE, TAG_TYPE, TEXT_TYPE
} = require('../../../constants/nodeTypes')

const {
  CREATE_ROOT, CREATE_TEXT, CREATE_TAG,
  CREATE_INSTANCE, UPDATE_INSTANCE, RESUME_INSTANCE
} = require('../../../constants/createNodeTypes')

describe('Create node', () => {

  it('throw error when pass unknown type', () => {

    expect(() => {
      createNode({})
    }).toThrowError('Unrecognized create node type')

  })

  it('create instance node', () => {

    class App extends Component {}

    const templateNode = {
      type: CLASS_TYPE,
      class: App,
      childs: [],
    }

    const node =
      createNode({
        type: CREATE_INSTANCE,
        templateNode,
        context: {},
      })

    expect(node.childs).toEqual([null])
    expect(node.type).toEqual(INSTANCE_TYPE)
    expect(node.instance instanceof templateNode.class).toBe(true)

  })

  it('after create instance assign ref instance', () => {

    class App extends Component {}

    class Menu extends Component {

      render() {
        return null
      }

    }

    const app = new App

    const templateNode = {
      type: CLASS_TYPE,
      class: Menu,
      childs: [],
      ref: {
        name: 'Menu',
        instance: app
      }
    }

    const node =
      createNode({
        type: CREATE_INSTANCE,
        templateNode,
        context: {}
      })

    expect(app.refs['Menu'] instanceof Menu).toBe(true)

  })

  it('update instance node', () => {

    class App extends Component {

      render() {
        return {}
      }

    }

    const liveNode = {
      type: INSTANCE_TYPE,
      instance: new App({ id: 1 }, { id: 1 }),
      childs: []
    }

    const templateNode = {
      type: CLASS_TYPE,
      class: App,
      props: { id: 2 },
      childs: []
    }

    const context = { id: 2 }

    const node =
      createNode({
        type: UPDATE_INSTANCE,
        liveNode,
        templateNode,
        context,
      })

    expect(node.type).toEqual(INSTANCE_TYPE)
    expect(node.instance instanceof templateNode.class).toBe(true)

  })

  it('resume instance node', () => {

    const liveNode = {
      type: INSTANCE_TYPE,
      instance: {},
      childs: [],
    }

    const node =
      createNode({
        type: RESUME_INSTANCE,
        liveNode,
        context: {},
      })

    expect(node).toEqual(liveNode)

  })

  it('create tag node', () => {

    const templateNode = {
      type: TAG_TYPE,
      tag: 'div',
      props: {},
      childs: [],
    }

    const node =
      createNode({
        type: CREATE_TAG,
        templateNode,
        context: {},
      })

    expect(node.type).toEqual(templateNode.type)
    expect(node.tag).toEqual(templateNode.tag)
    expect(node.props).toEqual(templateNode.props)
    expect(node.childs).toEqual(templateNode.childs)

  })

  it('create text node', () => {

    const templateNode = {
      type: TEXT_TYPE,
      text: 'some text',
    }

    const node =
      createNode({
        type: CREATE_TEXT,
        templateNode,
        context: {},
      })

    expect(node.type).toEqual(templateNode.type)
    expect(node.text).toEqual(templateNode.text)

  })

  it('create root node', () => {

    const templateNode = {
      type: ROOT_TYPE,
      dom: {},
      childs: []
    }

    const node =
      createNode({
        type: CREATE_ROOT,
        templateNode,
        context: {},
      })

    expect(node.type).toEqual(templateNode.type)
    expect(node.dom).toEqual(templateNode.dom)
    expect(node.childs).toEqual(templateNode.childs)

  })

})
