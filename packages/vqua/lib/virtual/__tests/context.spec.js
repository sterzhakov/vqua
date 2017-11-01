const render = require('../../dom/render')
const Component = require('../Component')
const html = require('../html')

describe('Context', () => {

  it('pass context to child component', () => {

    class Hello extends Component {

      static injectContext() {

        return ['name']

      }

      render() {

        return 'Hello ' + this.context.name + '!'

      }

    }

    class App extends Component {

      passContext() {

        return {
          name: 'Igor'
        }

      }

      render() {

        return Hello.v()

      }

    }

    const app = document.createElement('div')

    render(app, [], [App.v()])

    expect(app.textContent).toBe('Hello Igor!')

  })

  it('rewrite context', () => {

    class Hello extends Component {

      static injectContext() {

        return ['name']

      }

      render() {

        return 'Hello ' + this.context.name + '!'

      }

    }

    class Rewriter extends Component {

      passContext() {

        return {
          name: 'Igor Sterjakov'
        }

      }

      render() {

        return Hello.v()

      }

    }

    class App extends Component {

      passContext() {

        return {
          name: 'Igor'
        }

      }

      render() {

        return Rewriter.v()

      }

    }

    const app = document.createElement('div')

    render(app, [], [App.v()])

    expect(app.textContent).toBe('Hello Igor Sterjakov!')

  })


})
