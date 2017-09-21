const { Component, html } = require('vqua')

class WelcomeContainer extends Component {

  render() {

    const { h1, p } = html

    return [
      h1({},
        'Welcome!'
      ),
      p({},
        'Test page.'
      )
    ]

  }

}

module.exports = WelcomeContainer
