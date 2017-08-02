const { Component, html } = require('vqua')

class Error404 extends Component {

  render() {

    const { p } = html

    return (
      p({}, 'Error 404')
    )

  }

}

module.exports = Error404
