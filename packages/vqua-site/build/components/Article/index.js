const { Component } = require('vqua')
const createArticle = require('./createArticle')
const Error404 = require('../Error404')

class Article extends Component {

  static injectContext() {

    return ['locale']

  }

  static defaultProps(props, context) {

    try {

      const article =
        createArticle({
          locale: context.locale,
          name: props.name,
        })

      return (resolve) => {

        setTimeout(() => {

          resolve(Object.assign({}, props, { article }))

        }, 1500)

      }

    } catch (error) {

      const article = Error404.v()

      return Object.assign({}, props, { article })

    }

  }

  render() {

    return this.props.article

  }

}

module.exports = Article
