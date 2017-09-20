const { Component, html } = require('vqua')
const translations = require('../../translations')

class Error404 extends Component {

  static injectContext() {

    return ['locale']

  }

  render() {

    const { h1, p } = html

    const { locale } = this.context

    return [
      h1({},
        translations[locale].Error404.header
      ),
      p({},
        translations[locale].Error404.content
      ),
    ]

  }

}

module.exports = Error404
