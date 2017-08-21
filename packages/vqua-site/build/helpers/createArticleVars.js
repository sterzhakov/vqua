const filterCode = require('./filterCode')
const Code = require('../components/Code')

const extension2language = {
  '.js':   'javascript',
  '.sh':   'shell',
  '.html': 'xml'
}

module.exports = ({ vquaArticle, locale, examples, rawExamples, humanId }) => {

  const keyedExamples = examples.reduce((keyedExamples, example) => {

    return Object.assign({}, keyedExamples, {
      [example.variableName]: example
    })

  }, {})

  return rawExamples.reduce((articleVars, rawExample, index) => {

    const language = extension2language[rawExample.fileExtension]

    const code =
      filterCode(rawExample.content, {
        cutBefore: true,
        cutAfter: true
      })

    const codeParams = {
      key: Math.random(),
      hello: 'world',
      locale,
      code,
      language,
      humanId,
      variableName: rawExample.variableName,
      example: keyedExamples[rawExample.variableName]
    }

    return Object.assign({}, articleVars, {
      [rawExample.variableName]: Code.v(codeParams)
    })

  }, {})

}
