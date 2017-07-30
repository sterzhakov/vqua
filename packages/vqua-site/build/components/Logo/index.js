require('./styles/index.scss')

const { Component, html } = require('vqua')

class Logo extends Component {

  static injectContext() {
    return ['locale']
  }

  render() {

    const { locale } = this.context

    const { a, img } = html

    return (
      a({ class: 'vqua-logo', href: '/' + locale },
        img({ class: 'vqua-logo__image', src: '/vqua-logo.svg' })
      )
    )

  }

}

module.exports = Logo
