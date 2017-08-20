const { Component, html } = require('vqua')

const Sidebar = require('../Sidebar')
const Content = require('../Content')
const Locale = require('../Locale')

class App extends Component {

  passContext() {

    return {
      path: this.props.path,
      locale: this.props.locale,
      segments: this.props.segments,
      humanId: this.props.humanId,
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
