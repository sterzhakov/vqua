const { Component } = require('vqua')
const createArticle = require('./createArticle')
const Error404 = require('../Error404')

class Article extends Component {

  static injectContext() {

    return ['locale']

  }


  render() {

    return this.props.article

  }

}

module.exports = Article
