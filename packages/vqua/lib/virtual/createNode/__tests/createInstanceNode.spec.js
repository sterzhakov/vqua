const Component = require('../../Component')
const createInstanceNode = require('../../createNode/createInstanceNode')
const {
  TAG_TYPE, TEXT_TYPE, CLASS_TYPE, INSTANCE_TYPE
} = require('../../../constants/nodeTypes')

describe('Create instance node', () => {

  it('merge default props with template props', () => {

    class App extends Component {

      static defaultProps() {
        return {
          defaultProps: true,
          templateProps: false,
        }
      }

    }

    const templateNode = {
      nodeType: CLASS_TYPE,
      props: { templateProps: true },
      class: App,
      childs: []
    }

    const node = createInstanceNode({ templateNode })

    expect(node.instance.props).toEqual({
      defaultProps: true,
      templateProps: true,
    })

  })

  it('set props and context to instance', () => {

    class App extends Component {

      static injectContext() {

        return ['id']

      }

    }

    const templateNode = {
      nodeType: CLASS_TYPE,
      props: { id: 'props' },
      class: App,
      childs: []
    }

    const node = createInstanceNode({ templateNode })

    expect(node.instance.props).toEqual({ id: 'props' })

  })

  it('clone ref from template node', () => {

    let instance = { id: 1 }

    class App extends Component {

      render() {
        return null
      }

    }

    const templateNode = {
      nodeType: CLASS_TYPE,
      props: {},
      class: App,
      childs: [],
      ref: {
        name: 'app',
        instance
      }
    }

    const node = createInstanceNode({ templateNode })

    expect(node.ref.name).toBe('app')
    expect(node.ref.instance).toEqual(instance)

  })

})
