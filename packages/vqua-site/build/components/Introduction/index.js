require('./styles/index.scss')

const { Component } = require('vqua')
const formatArticle = require('../../helpers/formatArticle')
const Code = require('..//Code')

const beatles = require('raw-loader!./examples/beatles.js')
const Beatles = require('./examples/beatles.js')

const frank = require('raw-loader!./examples/frank.js')
const Frank = require('./examples/frank.js')

class Introduction extends Component {

  static injectContext() {

    return ['locale']

  }

  render() {

    const { locale } = this.context

    const article = require(
      'raw-loader!./articles/introduction.' + locale + '.md'
    )

    return formatArticle(article, {
      frank: Code.v({ raw: frank, component: Frank.v() }),
      beatles: Code.v({ raw: frank, component: Beatles.v() })
    })

  }

}

module.exports = Introduction
