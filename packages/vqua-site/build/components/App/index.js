const { Component, html } = require('vqua')

const Sidebar = require('../Sidebar')
const Content = require('../Content')
const Locale = require('../Locale')



class App extends Component {

  passContext() {

    return {
      locale: this.props.locale
    }

  }

  render() {
    return [
      Locale.v({},
        Sidebar.v(),
        Content.v({},
          this.props.childs
        )
      )
    ]
  }

}

module.exports = App
