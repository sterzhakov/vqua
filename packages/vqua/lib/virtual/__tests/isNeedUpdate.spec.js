const Component = require('../../virtual/Component')
const render = require('../../dom/render')

describe('Lifecycle hooks: Component.isNeedUpdate()', () => {

  it('props should change when return true ', () => {

    class Welcome extends Component {

      isNeedUpdate(nextProps, nextState, nextContext) {

        return true

      }

      afterUpdate() {

        expect(this.props).toEqual({ name: 'user', childs: [] })

      }

      render() {

        return this.props.name

      }

    }

    class App extends Component {

      constructor(props, context) {

        super(props, context)

        this.state = {
          name: 'guest',
        }

      }

      afterMount() {

        this.setState({ name: 'user' })

      }

      render() {

        return Welcome.v({ name: this.state.name })

      }

    }

    const $app = document.createElement('div')

    render($app, [], [App.v()], {})

  })

  it('state should change when return true ', () => {

    class App extends Component {

      constructor(props, context) {

        super(props, context)

        this.state = {
          name: 'guest',
        }

      }

      afterMount() {

        this.setState({ name: 'user' })

      }

      afterUpdate() {

        expect(this.state).toEqual({ name: 'user' })

      }

      isNeedUpdate(nextProps, nextState, nextContext) {

        return true

      }

      render() {

        return this.state.name

      }

    }

    const $app = document.createElement('div')

    render($app, [], [App.v()], {})

  })

  it('context should change when return true ', () => {

    class Welcome extends Component {

      static injectContext() {

        return ['name']

      }

      isNeedUpdate(nextProps, nextState, nextContext) {

        return true

      }

      afterUpdate() {

        expect(this.context).toEqual({ name: 'user' })

      }

      render() {

        return this.context.name

      }

    }

    class App extends Component {

      constructor(props, context) {

        super(props, context)

        this.state = {
          name: 'guest',
          other: 'test'
        }

      }

      afterMount() {

        this.setState({ name: 'user' })

      }

      passContext() {

        return {
          name: this.state.name
        }

      }

      render() {

        return Welcome.v()

      }

    }

    const $app = document.createElement('div')

    render($app, [], [App.v()], {})

  })


  it('props should not change when return false ', () => {

    class Welcome extends Component {

      isNeedUpdate(nextProps, nextState, nextContext) {

        return false

      }

      render() {

        return this.props.name

      }

    }

    class App extends Component {

      constructor(props, context) {

        super(props, context)

        this.state = {
          name: 'guest',
        }

      }

      afterMount() {

        this.setState({ name: 'user' })

      }

      render() {

        return Welcome.v({ name: this.state.name })

      }

    }

    const $app = document.createElement('div')

    const newLiveNodes = render($app, [], [App.v()], {})

    expect(
      newLiveNodes[0].childs[0].childs[0].instance.props
    ).toEqual({ name: 'guest', childs: [] })

  })

  it('state should not change when return false ', () => {

    class App extends Component {

      constructor(props, context) {

        super(props, context)

        this.state = {
          name: 'guest',
        }

      }

      afterMount() {

        this.setState({ name: 'user' })

      }

      isNeedUpdate(nextProps, nextState, nextContext) {

        return false

      }

      render() {

        return this.state.name

      }

    }

    const $app = document.createElement('div')

    const newLiveNodes = render($app, [], [App.v()], {})

    expect(
      newLiveNodes[0].childs[0].instance.state
    ).toEqual({ name: 'guest'})

  })

  it('context should not change when return false ', () => {

    class Welcome extends Component {

      static injectContext() {

        return ['name']

      }

      isNeedUpdate(nextProps, nextState, nextContext) {

        return false

      }

      afterUpdate() {

        expect(this.context).toEqual({ name: 'user' })

      }

      render() {

        return this.context.name

      }

    }

    class App extends Component {

      constructor(props, context) {

        super(props, context)

        this.state = {
          name: 'guest',
          other: 'test'
        }

      }

      afterMount() {

        this.setState({ name: 'user' })

      }

      passContext() {

        return {
          name: this.state.name
        }

      }

      render() {

        return Welcome.v()

      }

    }

    const $app = document.createElement('div')

    const newLiveNodes = render($app, [], [App.v()], {})

    expect(
      newLiveNodes[0].childs[0].childs[0].instance.context
    ).toEqual({ name: 'guest'})

  })


  it('nextProps should be different from state after update it', () => {

    class Welcome extends Component {

      isNeedUpdate(nextProps, nextState, nextContext) {

        expect(this.props).toEqual({ name: 'guest', childs: [] })
        expect(nextProps).toEqual({ name: 'user', childs: [] })

        return true

      }

      render() {

        return this.props.name

      }

    }

    class App extends Component {

      constructor(props, context) {

        super(props, context)

        this.state = {
          name: 'guest',
        }

      }

      afterMount() {

        this.setState({ name: 'user' })

      }

      render() {

        return Welcome.v({ name: this.state.name })

      }

    }

    const $app = document.createElement('div')

    render($app, [], [App.v()], {})

  })

  it('nextState should be different from state after update it', () => {

    class App extends Component {

      constructor(props, context) {

        super(props, context)

        this.state = {
          name: 'guest',
        }

      }

      afterMount() {

        this.setState({ name: 'user' })

      }

      isNeedUpdate(nextProps, nextState, nextContext) {

        expect(this.state).toEqual({ name: 'guest' })
        expect(nextState).toEqual({ name: 'user' })

        return true

      }

      render() {

        return this.state.name

      }

    }

    const $app = document.createElement('div')

    render($app, [], [App.v()], {})

  })

  it('nextContext should be different from context after update state', () => {

    class Welcome extends Component {

      static injectContext() {

        return ['name']

      }

      isNeedUpdate(nextProps, nextState, nextContext) {

        expect(this.context).toEqual({ name: 'guest' })
        expect(nextContext).toEqual({ name: 'user' })

        return true

      }

      render() {

        return this.context.name

      }

    }

    class App extends Component {

      constructor(props, context) {

        super(props, context)

        this.state = {
          name: 'guest',
          other: 'test'
        }

      }

      afterMount() {

        this.setState({ name: 'user' })

      }

      passContext() {

        return {
          name: this.state.name
        }

      }

      render() {

        return Welcome.v()

      }

    }

    const $app = document.createElement('div')

    render($app, [], [App.v()], {})

  })

})
