require('./styles/index.scss')

const { Component, html } = require('vqua')
const MenuSite = require('../MenuSite')
const MenuGuide = require('../MenuGuide')
const MenuLocale = require('../MenuLocale')

const Logo = require('../Logo')

class Sidebar extends Component {

  constructor(props, context) {

    super(props, context)

  }

  render() {

    const { div, a, img } = html

    return (

      div({ class: 'sidebar' },
        Logo.v({}),
        MenuLocale.v({}),
        MenuGuide.v({}),
        MenuSite.v({})
      )
    )
  }

}

module.exports = Sidebar
