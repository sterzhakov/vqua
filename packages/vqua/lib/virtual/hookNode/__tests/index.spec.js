const Component = require('../../Component')
const hookNode = require('../../hookNode')

const {
  TEXT_TYPE, TAG_TYPE, CLASS_TYPE, INSTANCE_TYPE
} = require('../../../constants/nodeTypes')

const {
  BEFORE_EACH_ITERATION, ON_INSTANCE_CREATE,
  BEFORE_INSTANCE_UPDATE, AFTER_DOM_CREATE,
} = require('../../../constants/hookTypes')

describe('Hook node', () => {

  it('throw new error when unknow hook action was passed', () => {

    expect(() => {
      hookNode(null, null, null, null)
    }).toThrow(
      new Error('Unrecognized hook node action')
    )

  })

  describe('after dom create', () => {

    it('call after mount when waitAfterMount flag present', () => {

      class App {

        afterMount() {}

      }

      const app = new App

      app.waitAfterMount = true

      const liveNode = {
        type: INSTANCE_TYPE,
        instance: app,
        childs: []
      }

      spyOn(app, 'afterMount').and.callThrough()

      hookNode(AFTER_DOM_CREATE, liveNode, null, null)

      expect(
        app.afterMount.calls.count()
      ).toBe(1)

    })

    it('call after update when waitAfterUpdate flag present', () => {

      class App {

        afterUpdate() {}

      }

      const app = new App

      app.prevProps = { id: 1 }
      app.prevState = { id: 1 }
      app.prevContext = { id: 1 }
      app.waitAfterUpdate = true

      const liveNode = {
        type: INSTANCE_TYPE,
        instance: app,
        childs: []
      }

      spyOn(app, 'afterUpdate').and.callThrough()

      hookNode(AFTER_DOM_CREATE, liveNode, null, null)

      expect(
        app.afterUpdate.calls.allArgs()
      ).toEqual([
        [{ id: 1 }, { id: 1 }, { id: 1 }]
      ])

    })

  })


  it('before instance update call before update', () => {

    class App {

      beforeUpdate() {}

    }

    const app = new App

    const liveNode = {
      type: INSTANCE_TYPE,
      instance: app,
      childs: []
    }

    const templateNode = {
      type: CLASS_TYPE,
      class: App,
      props: { id: 1 },
      childs: []
    }

    const context = { id: 1 }

    spyOn(app, 'beforeUpdate').and.callThrough()

    hookNode(BEFORE_INSTANCE_UPDATE, liveNode, templateNode, context)

    expect(
      app.beforeUpdate.calls.allArgs()
    ).toEqual([
      [{ id: 1 }, undefined, { id: 1 }]
    ])

  })


  it('before instance update set after update flag', () => {

    class App {

      beforeUpdate() {}

    }

    const app = new App

    const liveNode = {
      type: INSTANCE_TYPE,
      instance: app,
      childs: []
    }

    const templateNode = {
      type: CLASS_TYPE,
      class: App,
      props: { id: 1 },
      childs: []
    }

    const context = { id: 1 }

    hookNode(BEFORE_INSTANCE_UPDATE, liveNode, templateNode, context)

    expect(
      app.waitAfterUpdate
    ).toBe(true)

  })


  it('after instance create call before mount', () => {

    class App {

      beforeMount() {}

    }

    const app = new App

    const liveNode = {
      type: INSTANCE_TYPE,
      instance: app,
      childs: []
    }

    spyOn(app, 'beforeMount').and.callThrough()

    hookNode(ON_INSTANCE_CREATE, liveNode, null, {})

    expect(
      app.beforeMount.calls.count()
    ).toBe(1)

  })


  it('after instance set wait before unmount flag', () => {

    class App {

      beforeMount() {}

    }

    const app = new App

    const liveNode = {
      type: INSTANCE_TYPE,
      instance: app,
      childs: []
    }

    hookNode(ON_INSTANCE_CREATE, liveNode, null, {})

    expect(
      app.waitAfterMount
    ).toBe(true)

  })


  it('before each iteration call before unmount', () => {

    class App extends Component {

      beforeUnmount() {}

    }

    class App2 {}

    const instances = [ new App, new App, new App ]

    const liveNode = {
      type: INSTANCE_TYPE,
      instance: instances[0],
      childs: [
        {
          type: INSTANCE_TYPE,
          instance: instances[1],
        },
        {
          type: TEXT_TYPE,
        },
        {
          type: INSTANCE_TYPE,
          instance: instances[2],
        },
      ]
    }

    const templateNode = {
      type: CLASS_TYPE,
      class: App2,
      childs: [
        {
          type: TEXT_TYPE,
        }
      ]
    }

    spyOn(instances[0], 'beforeUnmount').and.callThrough()
    spyOn(instances[1], 'beforeUnmount').and.callThrough()
    spyOn(instances[2], 'beforeUnmount').and.callThrough()

    hookNode(BEFORE_EACH_ITERATION, liveNode, templateNode, {})

    expect(instances[0].beforeUnmount).toHaveBeenCalledTimes(1)
    expect(instances[1].beforeUnmount).toHaveBeenCalledTimes(1)
    expect(instances[2].beforeUnmount).toHaveBeenCalledTimes(1)

  })

  it('before each iteration remove refs from nodes for unmount', () => {

    let instance = { refs: { app: true, div: true } }

    const liveNode = {
      type: INSTANCE_TYPE,
      instance: {},
      props: {},
      ref: {
        name: 'app',
        instance,
      },
      childs: [
        {
          type: TAG_TYPE,
          tag: 'div',
          props: {},
          childs: [],
          ref: {
            name: 'div',
            instance,
          }
        }
      ]
    }

    const templateNode = null

    hookNode(BEFORE_EACH_ITERATION, liveNode, templateNode, {})

    expect(
      Object.keys(instance.refs).length
    ).toBe(0)

  })

})
