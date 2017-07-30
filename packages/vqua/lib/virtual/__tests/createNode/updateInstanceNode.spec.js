const Component = require('../../Component')
const updateInstanceNode = require('../../createNode/updateInstanceNode')
const { CLASS_TYPE } = require('../../../constants/nodeTypes')

describe('Update instance with next params: props, state, context', () => {

  class App extends Component {

    static injectContext() {

      return ['id']

    }

    constructor(props, context) {
      super(props, context)
      this.state = {
        id: 1
      }
    }

    render() {
      return this.props.id
    }

  }

  it('create node with new instance params', () => {

    const templateNode = {
      type: CLASS_TYPE,
      props: { id: 2 },
      childs: []
    }

    const liveNode = {
      type: CLASS_TYPE,
      instance: new App({ id: 1 }, { id: 1 })
    }

    const newNode =
      updateInstanceNode({
        liveNode,
        templateNode,
        context: { id: 2 }
      })

    expect(newNode.instance.prevProps.id).toBe(1)
    expect(newNode.instance.prevState.id).toBe(1)
    expect(newNode.instance.prevContext.id).toBe(1)

    expect(newNode.instance.props.id).toBe(2)
    expect(newNode.instance.state.id).toBe(1)
    expect(newNode.instance.context.id).toBe(2)

  })

  it('after update childs is from template node ', () => {

    const liveNode = {
      type: CLASS_TYPE,
      instance: new App({ id: 1 }, { id: 1 }),
      childs: [ 1 ]
    }

    const templateNode = {
      type: CLASS_TYPE,
      props: { id: 2 },
      childs: [ 2 ]
    }

    const newNode =
      updateInstanceNode({
        liveNode,
        templateNode,
        context: { id: 2 }
      })

    expect(newNode.childs).toEqual([2])

  })

})
