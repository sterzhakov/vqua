const { Component, html } = require('vqua')

// cut before

class Toggler extends Component {

  constructor(props, context) {

    super(props, context)

    this.state = {
      active: true
    }

  }

  handleClick(event) {

    event.preventDefault()

    this.setState({ active: !this.state.active })

  }

  render() {

    const { div, a, br } = html

    const first = (
      div({ key: 'first' },
        div({},
          'first'
        )
      )
    )

    const second = (
      div({ key: 'second' },
        'second'
      )
    )

    const toggle = [
      a({ href: '#toggle', onClick: (e) => this.handleClick(e) },
        'Toggle!'
      ),
      br(),
    ]

    return this.state.active
      ? [ toggle, second, first ]
      : [ toggle, first, second ]

  }

}

// cut after

module.exports = Toggler
