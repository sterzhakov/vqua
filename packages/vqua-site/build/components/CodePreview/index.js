const { html, Component, render } = require('vqua')
const translations = require('../../translations')

class CodePreview extends Component {

  constructor(props, context) {

    super(props, context)

    this.loadPreview = this.loadPreview.bind(this)

  }

  afterMount() {

    this.loadPreview()

  }

  loadPreview() {

    this.refs.preview.innerHTML = ''

    render(this.refs.preview, this.props.preview.v(), (error) => {

      if (error) throw error

    })
  }

  render() {

    const { div, a } = html

    return [
      div({ class: 'code__menu' },
        div({ class: 'code__menu__line' }),
        a({
          class: 'code__menu__item',
          href: '#refresh',
          ref: 'refresh',
          onClick: this.loadPreview
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
