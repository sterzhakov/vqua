const filterCode = require('./filterCode')
const Code = require('../components/Code')

const extension2language = {
  '.js':   'javascript',
  '.sh':   'shell',
  '.html': 'xml'
}

module.exports = ({ vquaArticle, locale, examples, rawExamples, humanId }) => {

  return rawExamples.reduce((articleVars, rawExample, index) => {

    const language = extension2language[rawExample.fileExtension]

    const code =
      filterCode(rawExample.content, {
        cutBefore: true,
        cutAfter: true
      })

    const codeParams = {
      locale,
      code,
      language,
      humanId,
      key: rawExample.name,
    }

    return Object.assign({}, articleVars, {
      [rawExample.variableName]: Code.v(codeParams)
    })

  }, {})

}
