const {
  TEXT_TYPE, TAG_TYPE, INSTANCE_TYPE, CLASS_TYPE
} = require('../../constants/nodeTypes')
const Component = require('../Component')
const render = require('../../dom/render')

describe('Component', () => {

  it('v() helper create node', () => {

    class App extends Component {}

    expect(
      App.v({ id: 1, ref: 'app' }, 'test')
    ).toEqual({
      type: CLASS_TYPE,
      props: {
        id: 1,
        childs: [
          'test'
        ]
      },
      class: App,
      ref: 'app'
    })

  })

  it('update state', () => {

    class App extends Component {

      constructor(props) {
        super(props)
        this.state = { count: 0 }
      }

      render() {
        return [
          {
            type: TAG_TYPE,
            tag: 'div',
            props: {},
            childs: [
              {
                type: TEXT_TYPE,
                text: this.state.count
              }
            ]
          }
        ]
      }

    }

    const templateNodes = [
      {
        type: CLASS_TYPE,
        class: App,
        props: {},
        childs: []
      }
    ]

    const rootDomNode = document.createElement('div')

    const liveNodes = render(rootDomNode, [], templateNodes)

    const instance = liveNodes[0].childs[0].instance

    instance.setState({ count: instance.state.count + 1 })

    expect(
      rootDomNode.childNodes[0].childNodes[0].textContent
    ).toBe('1')


  })

})
