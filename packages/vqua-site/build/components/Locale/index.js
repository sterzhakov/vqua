const { Component } = require('vqua')

class Locale extends Component {

  static injectContext() {

    return ['router']

  }

  render() {

    return this.props.childs

  }

}

module.exports = Locale
