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

    code.textContent = this.props.code

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
        CodePreview.v({
          example: this.props.example,
          humanId: this.props.humanId,
          locale: this.props.locale,
        })
      )
    )

  }

}

module.exports = Code
