const { Component } = require('vqua')
const App = require('../components/App')
const ExampleModel = require('../models/Example')
const createArticle = require('../helpers/createArticle')

class ArticleContainer extends Component {

  constructor(props, context) {

    super(props, context)

    this.state = {
      examples: []
    }

  }

  afterMount() {

    ExampleModel.all({
      humanId: this.props.humanId,
      locale: this.props.locale
    }).then((examples) => {

      this.setState({ examples })

    })

  }

  render() {

    const articleParams = Object.assign({}, this.props, {
      examples: this.state.examples
    })

    const article = createArticle(articleParams)

    return (
      App.v(this.props,
        article
      )
    )

  }

}

module.exports = ArticleContainer
