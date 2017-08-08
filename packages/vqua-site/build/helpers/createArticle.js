const html2vqua = require('html2vqua')
const vquaInterpolate = require('vqua-interpolate')
const createArticleVars = require('./createArticleVars')

module.exports = ({ article, rawExamples, locale, humanId, examples }) => {

  const vquaArticle = html2vqua(article)

  const extension2language = {
    '.js':   'javascript',
    '.sh':   'shell',
    '.html': 'xml'
  }

  const articleVars =
    createArticleVars({
      vquaArticle,
      locale,
      examples,
      rawExamples,
      humanId
    })

  return vquaInterpolate(vquaArticle, articleVars)

}
