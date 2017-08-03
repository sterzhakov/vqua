const filterCode = require('./filterCode')
const Code = require('../components/Code')

const extension2language = {
  '.js':   'javascript',
  '.sh':   'shell',
  '.html': 'xml'
}

module.exports = ({ vquaArticle, locale, examples, rawExamples }) => {

  return rawExamples.reduce((articleVars, rawExample, index) => {

    const example = examples[index]

    const language = extension2language[rawExample.fileExtension]

    const code =
      filterCode(rawExample.content, {
        cutBefore: true,
        cutAfter: true
      })

    const previewParams = example
      ? { preview: example.content }
      : {}


    const codeParams =
      Object.assign({}, previewParams, {
        locale,
        code,
        language,
        key: rawExample.name,
      })

    return Object.assign({}, articleVars, {
      [rawExample.variableName]: Code.v(codeParams)
    })

  }, {})

}
