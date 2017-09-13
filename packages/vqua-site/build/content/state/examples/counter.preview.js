const { html, Component } = require('vqua')

// cut before

class Counter extends Component {

  constructor(props, context) {

    super(props, context)

    this.state = {
      counter: 0
    }

  }

  handleClick(event) {

    event.preventDefault()

    this.setState({ counter: this.state.counter + 1 })

  }

  render() {

    const { div, a, p } = html

    return (
      div({},
        p({}, this.state.counter),
        a({
          href: '#click',
          onClick: event => this.handleClick(event)
        },
          'Click me!'
        )
      )
    )

  }

}

// cut after

module.exports = Counter
