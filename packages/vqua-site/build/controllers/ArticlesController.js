const App = require('../components/App')

class ArticleController extends ApplicationController {

  async show(params) {

    const app = (
      App.v({},
        'Examples article'
      )
    )

    this.send(nodes)

  }

}

module.exports = ArticleController
