const Component = require('../../Component')
const createTree = require('../../createTree')
const Statistic = require('../../Statistic')
const render = require('../../../dom/render')

const {
  ROOT_TYPE, TEXT_TYPE, TAG_TYPE, CLASS_TYPE, INSTANCE_TYPE
} = require('../../../constants/nodeTypes')

describe('Create tree', () => {

  it('by another tree', () => {

    class App extends Component {

      static injectContext() {

        return ['id']

      }

      constructor(props, context) {

        super(props, context)

        this.state = { id: 1 }

      }

      render() {

        return [
          {
            type: TAG_TYPE,
            tag: 'div',
            props: { id: this.props.id },
            childs: [
              {
                type: TEXT_TYPE,
                text: this.props.id == 1 ? 'Hello world' : 'Hello',
              }
            ]
          }
        ]

      }

    }

    const liveNodes = [
      {
        type: ROOT_TYPE,
        childs: [
          {
            type: INSTANCE_TYPE,
            instance: new App({ id: 1 }, { id: 1 }),
          },
        ]
      }
    ]

    const templateNodes = [
      {
        type: ROOT_TYPE,
        childs: [
          {
            type: CLASS_TYPE,
            class: App,
            props: { id: 2 },
            childs: [
              {
                type: TAG_TYPE,
                tag: 'div',
                props: { id: 2 },
                childs: [
                  {
                    type: TEXT_TYPE,
                    text: 'Hello',
                  }
                ]
              },
            ]
          },
        ]
      }
    ]

    const newLiveNodes =
      createTree(
        liveNodes,
        templateNodes,
        {
          context: { id: 'context' },
          statistic: new Statistic,
        }
      )

    expect(newLiveNodes[0].type).toBe(ROOT_TYPE)
    expect(newLiveNodes[0].childs.length).toBe(1)

    expect(newLiveNodes[0].childs[0].type).toBe(INSTANCE_TYPE)
    expect(newLiveNodes[0].childs[0].instance instanceof App).toBe(true)
    expect(newLiveNodes[0].childs[0].instance.props).toEqual({ id: 2 })
    expect(
      newLiveNodes[0].childs[0].instance.context
    ).toEqual({ id: 'context' })
    expect(newLiveNodes[0].childs[0].childs.length).toBe(1)

    expect(newLiveNodes[0].childs[0].childs[0].type).toBe(TAG_TYPE)
    expect(newLiveNodes[0].childs[0].childs[0].tag).toBe('div')
    expect(newLiveNodes[0].childs[0].childs[0].props).toEqual({ id: 2 })
    expect(newLiveNodes[0].childs[0].childs[0].childs.length).toBe(1)

    expect(newLiveNodes[0].childs[0].childs[0].childs[0].type).toBe(TEXT_TYPE)
    expect(newLiveNodes[0].childs[0].childs[0].childs[0].text).toBe('Hello')


  })

  it('with instance refs', () => {

    class Modal extends Component {

      render() {

        return this.props.childs

      }

    }

    class Form extends Component {

      render() {

        return 'Form'

      }

    }

    class App extends Component {

      render() {

        return (
          Modal.v({},
            Form.v({ ref: 'Form' })
          )
        )

      }

    }

    const liveNodes = []

    const templateNodes = [App.v()]

    const newLiveNodes =
      createTree(
        liveNodes,
        templateNodes,
        {
          statistic: new Statistic,
        }
      )

    expect(
      newLiveNodes[0].instance.refs.Form instanceof Form
    ).toBe(true)

    // console.log(newLiveNodes[0].childs[0].childs[0].ref)

  })

})
