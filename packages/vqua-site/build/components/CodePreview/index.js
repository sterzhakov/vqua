const { html, Component, render } = require('vqua')
const translations = require('../../translations')

class CodePreview extends Component {

  handleClick(event) {

    event.preventDefault()

  }

  afterMount() {

    this.loadPreview()

  }

  afterUpdate() {

    this.loadPreview()

  }

  loadPreview() {

    if (!this.props.example) return null

    this.refs.preview.innerHTML = ''

    const Example = this.props.example.content

    render(this.refs.preview, [], [Example.v()])

  }

  render() {

    if (!this.props.example) return null

    const { div, a } = html

    return [
      div({ class: 'code__menu' },
        div({ class: 'code__menu__line' }),
        a({
          class: 'code__menu__item',
          href: '#refresh',
          ref: 'refresh',
          onClick: (event) => this.handleClick(event)
        },
          translations[this.props.locale].Code.refresh
        ),
        div({ class: 'code__menu__line' })
      ),
      div({ class: 'code__preview', ref: 'preview' })
    ]

  }

}

module.exports = CodePreview
