const highlightjs = require('highlight.js/lib/highlight.js')
const javascriptSyntax = require('highlight.js/lib/languages/javascript')
const shellSyntax = require('highlight.js/lib/languages/shell')
const xmlSyntax = require('highlight.js/lib/languages/xml')
const CodePreview = require('../CodePreview')
const { htmlQuotes } = require('vqua-utils')
const ExampleModel = require('../../models/Example')

const { Component, html, render } = require('vqua')


class Code extends Component {

  constructor(props, context) {

    super(props, context)

    this.state = {
      examples: {}
    }

  }

  afterMount() {

    highlightjs.registerLanguage('javascript', javascriptSyntax)
    highlightjs.registerLanguage('shell', shellSyntax)
    highlightjs.registerLanguage('xml', xmlSyntax)

    const { code } = this.refs

    if (this.props.language == 'xml') {

      code.textContent = htmlQuotes.decode(code.textContent)

    }

    highlightjs.highlightBlock(code)

    ExampleModel.all({
      humanId: this.props.humanId,
      locale: this.props.locale
    }).then((examples) => {

      this.setState({ examples })

    })

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
          humanId: this.props.humanId,
          locale: this.props.locale,
        })
      )
    )

  }

}

module.exports = Code
