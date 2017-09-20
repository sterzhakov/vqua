const ArticleModel = require('../models/Article')
const ExampleModel = require('../models/Example')
const ErrorController = require('./ErrorController')

class ArticleController {

  static async show(req, res) {

    const { locale } = req.params

    const humanId = req.params.humanId || 'introduction'

    const article = await ArticleModel.find({ humanId, locale })

    const rawExamples = await ExampleModel.all({ humanId, locale, raw: true })

    if (!article) ErrorController.notFound(req, res)

    res.send(200, 'ArticleContainer', {
      path: req.url,
      segments: req.segments,
      humanId,
      locale,
      article,
      rawExamples,
    })


  }

}

module.exports = ArticleController
