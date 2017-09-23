const { Component, html } = require('vqua')

const createNavigationLinks = require('./helpers/createNavigationLinks')

class Content extends Component {

  static injectContext() {

    return ['navigate']

  }

  afterMount() {

    createNavigationLinks(this.context.navigate)

  }

  afterUpdate() {

    createNavigationLinks(this.context.navigate)

  }

  render() {

    const { div, h1 } = html

    return (
      div({ class: 'content' },
        this.props.childs
      )
    )
  }

}

module.exports = Content
