require('./styles/index.scss')
require('highlight.js/styles/github-gist.css')

const highlightjs = require('highlight.js/lib/highlight.js')
const javascriptSyntax = require('highlight.js/lib/languages/javascript')
const shellSyntax = require('highlight.js/lib/languages/shell')
const xmlSyntax = require('highlight.js/lib/languages/xml')
const CodePreview = require('../CodePreview')

const { Component, html, render } = require('vqua')

highlightjs.registerLanguage('javascript', javascriptSyntax)
highlightjs.registerLanguage('shell', shellSyntax)
highlightjs.registerLanguage('xml', xmlSyntax)


class Code extends Component {

  afterMount() {

    const { code } = this.refs

    code.innerHTML = ''

    const textNode = document.createTextNode(this.props.code)

    code.appendChild(textNode)

    highlightjs.highlightBlock(code)

  }

  render() {

    const { div, code } = html

    const codePreview = this.props.preview
      ? CodePreview.v({
          locale: this.props.locale,
          preview: this.props.preview
        })
      : null

    return (
      div({ class: 'code' },
        code({ class: 'code__highlight javascript', ref: 'code' }),
        codePreview
      )
    )

  }

}

module.exports = Code
