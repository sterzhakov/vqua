const { html, Component } = require('vqua')

class App extends Component {

  render() {

    const { p, span } = html

    return (
      p({},
        'Hello ',
        span({}, 'world'),
        '!'
      )
    )
  }

}

module.exports = App
