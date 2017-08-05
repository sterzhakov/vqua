const Component = require('../../Component')

const createCallback = require('../../createTree/createCallback')

const {
  CREATE_TEXT, CREATE_TAG, CREATE_INSTANCE, UPDATE_INSTANCE, RESUME_INSTANCE
} = require('../../../constants/createNodeTypes')

const {
  TEXT_TYPE, TAG_TYPE, CLASS_TYPE, INSTANCE_TYPE
} = require('../../../constants/nodeTypes')

describe('Create tree, create callback:', () => {

  it('for liveNode without template', () => {

    const node =
      createCallback({
        liveNode: {},
        templateNode: {},
        context: {}
      })

    expect(node).toEqual({
      newLiveNode: null,
      isNeedChilds: false,
      newContext: {},
      newLiveParentInstanceNode: null,
    })

  })

  describe('hook when options.hooks is true and when false doesn\'t', () => {

    it('before each iteration call before unmount', () => {

      class App extends Component { beforeUnmount() {} }

      class App2 extends Component {}

      const app = new App

      spyOn(app, 'beforeUnmount').and.callThrough()

      const liveNode = {
        type: INSTANCE_TYPE,
        instance: app
      }

      const templateNode = {
        type: CLASS_TYPE,
        class: App2,
        childs: [],
      }

      const newLiveNode =
        createCallback({
          liveNode,
          templateNode,
          options: { hooks: true }
        })

      expect(app.beforeUnmount).toHaveBeenCalled()

      app.beforeUnmount.calls.reset()

      const newLiveNode2 =
        createCallback({
          liveNode,
          templateNode
        })

      expect(app.beforeUnmount).not.toHaveBeenCalled()

    })

    it('after instance create call before mount', () => {

      const spy = { beforeMount: () => {} }

      class App extends Component {

        beforeMount() {
          spy.beforeMount()
        }

      }

      spyOn(spy, 'beforeMount')

      const templateNode = {
        type: CLASS_TYPE,
        class: App,
        childs: [],
      }

      const liveNode = null

      const node =
        createCallback({
          liveNode,
          templateNode,
          options: { hooks: true }
        })

      expect(spy.beforeMount).toHaveBeenCalled()

      spy.beforeMount.calls.reset()

      const node2 =
        createCallback({
          liveNode,
          templateNode
        })

      expect(spy.beforeMount).not.toHaveBeenCalled()

    })

    it('before instance update call before update', () => {

      class App extends Component {

        beforeUpdate() {}

        render() {}
      }


      const app = new App

      const liveNode = {
        type: INSTANCE_TYPE,
        instance: app,
        childs: [],
      }

      const templateNode = {
        type: CLASS_TYPE,
        class: App,
        props: { id: 1 },
        childs: [],
      }

      const context = { id: 1 }

      spyOn(app, 'beforeUpdate')

      const node =
        createCallback({
          liveNode, templateNode, context, options: { hooks: true }
        })

      expect(
        app.beforeUpdate.calls.allArgs()
      ).toEqual([
        [{ id: 1 }, {}, { id: 1 }],
      ])

      app.beforeUpdate.calls.reset()

      const node2 =
        createCallback({
          liveNode,
          templateNode,
          context
        })

      expect(app.beforeUpdate).not.toHaveBeenCalled()

    })

  })

  describe('create node', () => {

    it('create instance', () => {

      class App extends Component {}

      const liveNode = null

      const templateNode = {
        type: CLASS_TYPE,
        class: App,
        props: { id: 1 },
      }

      const context = { id: 1 }

      const newLiveNodeParams =
        createCallback({
          liveNode, templateNode, context
        })

      const {
        isNeedChilds,
        newLiveNode,
        newContext,
        newLiveParentInstanceNode
      } = newLiveNodeParams

      expect(isNeedChilds).toBe(true)
      expect(newLiveNode.instance instanceof App).toBe(true)
      expect(newLiveNode.instance.props).toEqual({ id: 1 })
      expect(newContext).toEqual({ id: 1 })
      expect(newLiveParentInstanceNode.instance instanceof App).toBe(true)

    })

    it('update instance when is need update', () => {

      class App extends Component {

        isNeedUpdate() {
          return true
        }

        render() {
          return null
        }

      }

      const liveNode = {
        type: INSTANCE_TYPE,
        instance: new App({ id: 1 }, { id: 1 }),
        childs: [],
      }

      const templateNode = {
        type: CLASS_TYPE,
        class: App,
        props: { id: 2 },
        childs: [],
      }

      const context = { id: 2 }

      const newLiveNodeParams =
        createCallback({
          liveNode,
          templateNode,
          context,
        })

      const {
        isNeedChilds,
        newLiveNode,
        newContext,
        liveParentNode,
        newLiveParentInstanceNode
      } = newLiveNodeParams

      expect(isNeedChilds).toBe(true)
      expect(newLiveNode.childs).toEqual([ null ])
      expect(newContext).toEqual({ id: 2 })
      expect(newLiveParentInstanceNode.instance instanceof App).toBe(true)

    })

    it('resume instance when it doesn\'t need update', () => {

      class App extends Component {

        isNeedUpdate() {
          return false
        }

        render() {
          return null
        }

      }

      const liveNode = {
        type: INSTANCE_TYPE,
        instance: new App({ id: 1 }, { id: 1 }),
        childs: [],
      }

      const templateNode = {
        type: CLASS_TYPE,
        class: App,
        props: { id: 2 },
        childs: [],
      }

      const context = { id: 2 }

      const newLiveNodeParams =
        createCallback({
          liveNode,
          templateNode,
          context
        })

      const {
        isNeedChilds,
        newLiveNode,
        newContext,
        newLiveParentInstanceNode
      } = newLiveNodeParams

      expect(isNeedChilds).toBe(false)
      expect(newLiveNode.childs).toEqual([])
      expect(newLiveNode.instance.nextProps).toEqual({})
      expect(newLiveNode.instance.nextContext).toEqual({})
      expect(newContext).toEqual({ id: 2 })
      expect(newLiveParentInstanceNode.instance instanceof App).toBe(true)

    })


    it('create tag', () => {

      const templateNode = {
        type: TAG_TYPE,
        tag: 'div',
        props: { id: 1 },
        childs: []
      }

      const newLiveNodeParams =
        createCallback({
          templateNode,
          liveNode: null,
          context: true,
          liveParentInstanceNode: null,
        })

      const {
        isNeedChilds,
        newLiveNode,
        newContext,
        newLiveParentInstanceNode
      } = newLiveNodeParams

      expect(newLiveNode).toEqual(templateNode)
      expect(isNeedChilds).toBe(true)
      expect(newContext).toBe(true)
      expect(newLiveParentInstanceNode).toBe(null)


    })

    it('create text', () => {

      const templateNode = {
        type: TEXT_TYPE,
        text: 'some text'
      }

      const newLiveNodeParams =
        createCallback({
          templateNode,
          liveNode: null,
          context: true,
          liveParentInstanceNode: null,
        })

      const {
        isNeedChilds,
        newLiveNode,
        newContext,
        newLiveParentInstanceNode
      } = newLiveNodeParams

      expect(templateNode).toEqual(newLiveNode)
      expect(newContext).toBe(true)
      expect(isNeedChilds).toBe(false)
      expect(newLiveParentInstanceNode).toBe(null)

    })

  })

})
