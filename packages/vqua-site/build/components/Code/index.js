const highlightjs = require('highlight.js/lib/highlight.js')
const javascriptSyntax = require('highlight.js/lib/languages/javascript')
const shellSyntax = require('highlight.js/lib/languages/shell')
const xmlSyntax = require('highlight.js/lib/languages/xml')
const CodePreview = require('../CodePreview')
const { htmlQuotes } = require('vqua-utils')

const { Component, html, render } = require('vqua')


class Code extends Component {

  afterMount() {

    highlightjs.registerLanguage('javascript', javascriptSyntax)
    highlightjs.registerLanguage('shell', shellSyntax)
    highlightjs.registerLanguage('xml', xmlSyntax)

    const { code } = this.refs

    if (this.props.language == 'xml') {

      code.textContent = htmlQuotes.decode(code.textContent)

    }

    highlightjs.highlightBlock(code)

  }

  render() {

    const { div, code } = html

    return (
      div({ class: 'code' },
        code({
          class: 'code__highlight javascript',
          ref: 'code',
        },
          htmlQuotes.encode(this.props.code)
        ),
        this.props.preview
          ? CodePreview.v({
              locale: this.props.locale,
              preview: this.props.preview
            })
          : null
      )
    )

  }

}

module.exports = Code
