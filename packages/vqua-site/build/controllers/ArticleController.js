const { html } = require('vqua')
const html2vqua = require('html2vqua')
const vquaInterpolate = require('vqua-interpolate')
const ArticleModel = require('../models/Article')
const ExampleModel = require('../models/Example')
const App = require('../components/App')
const createArticleVars = require('../helpers/createArticleVars')

class ArticleController {

  static async show(req, res) {

    const name = req.params.articleId || 'introduction'

    const locale = req.params.locale

    const rawArticle = await ArticleModel.find({ name, locale })


    const examples = await ExampleModel.all({ name, locale })

    const rawExamples = await ExampleModel.all({ name, locale, raw: true })

    const vquaArticle = html2vqua(rawArticle)

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

    const article = vquaInterpolate(vquaArticle, articleVars)

    res.send(App.v({ locale }, article), {
      context: {
        locale: req.params.locale,
        router: { segments: req.segments },
      }
    })

  }

}

module.exports = ArticleController
