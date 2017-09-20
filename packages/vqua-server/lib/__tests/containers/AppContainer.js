const { Component, html } = require('vqua')

class AppContainer extends Component {

  render() {

    const { p, span } = html

    return (
      p({},
        'Hello ',
        span({},
          'world'
        ),
        '!'
      )
    )

  }

}

module.exports = AppContainer
