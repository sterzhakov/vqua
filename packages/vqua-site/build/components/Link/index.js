const { html, Component } = require('vqua')
const { omit } = require('vqua-utils')

class Link extends Component {

  render() {

    const { a } = html

    const aProps = omit(this.props, 'childs')

    return (
      a(aProps, ...this.props.childs)
    )

  }

}

module.exports = Link
