require('./styles/index.scss')

const { Component, html } = require('vqua')

class Contact extends Component {

  render() {

    const { p } = html

    return (
      p({}, 'Contact')
    )

  }

}

module.exports = Contact
