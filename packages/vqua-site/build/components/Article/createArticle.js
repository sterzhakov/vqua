const html2vqua = require('html2vqua')
const vquaInterpolate = require('vqua-interpolate')
const ArticleModel = require('../../models/Article')
const ExampleModel = require('../../models/Example')
const Code = require('..//Code')
const filterCode = require('../../helpers/filterCode')

module.exports = ({ name, locale }) => {

  const rawArticle = ArticleModel.find({ name, locale })

  const vquaArticle = html2vqua(rawArticle)

  const examples = ExampleModel.all({ name, locale })

  const rawExamples = ExampleModel.all({ name, locale, raw: true })

  const extension2language = {
    '.js':   'javascript',
    '.sh':   'shell',
    '.html': 'xml'
  }

  const filterByLanguage = {
    xml: content => content,
    shell: content => content,
    javascript: (content) => {
      return filterCode(content, {
        cutBefore: true,
        cutAfter: true
      })
    },
  }

  const articleVars = rawExamples.reduce((articleVars, rawExample, index) => {

    const head = rawExample.content.match(/^(.*)$/m)[0]

    const params = head.slice(0, 4) == '// {'
      ? JSON.parse(head.slice(3))
      : { showPreview: 'true' }

    const example = examples[index]

    const language = extension2language[rawExample.extension]

    const previewParams = example
      ? { preview: example.content }
      : {}

    const codeParams = Object.assign({}, previewParams, {
      locale,
      code: filterByLanguage[language](rawExample.content),
      language,
      key: rawExample.name,
    })

    return Object.assign({}, articleVars,
      { [rawExample.name]: Code.v(codeParams) }
    )

  }, {})

  const interpolatedArticle = vquaInterpolate(vquaArticle, articleVars)

  return interpolatedArticle

}
