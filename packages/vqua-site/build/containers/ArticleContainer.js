const { Component } = require('vqua')
const html2vqua = require('html2vqua')
const vquaInterpolate = require('vqua-interpolate')
const App = require('../components/App')
const createArticleVars = require('../helpers/createArticleVars')

class ArticleContainer extends Component {

  render() {

    const {
      article,
      examples,
      rawExamples,
      locale,
    } = this.props

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
        rawExamples
      })

    const newArticle = vquaInterpolate(vquaArticle, articleVars)

    return (
      App.v(this.props,
        newArticle
      )
    )

  }

}

module.exports = ArticleContainer
