require('./styles/index.scss')

const { Component, html } = require('vqua')

class Content extends Component {

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
