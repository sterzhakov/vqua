const { Component } = require('vqua')
const html2vqua = require('../../helpers/html2vqua')

class Introduction extends Component {

  static injectContext() {

    return ['locale']

  }

  render() {

    const { locale } = this.context

    return null
  }

}

module.exports = Introduction
