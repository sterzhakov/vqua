const { html, Component } = require('vqua')
const { omit } = require('vqua-utils')

class Link extends Component {

  static injectContext() {

    return ['navigate']

  }

  handleClick(event) {

    event.preventDefault()

    const { navigate } = this.context

    navigate(this.props.href)

  }

  render() {

    const { a } = html

    const aProps = Object.assign({}, omit(this.props, 'childs'), {
      onClick: (e) => this.handleClick(e)
    })

    return (
      a(aProps, ...this.props.childs)
    )

  }

}

module.exports = Link
