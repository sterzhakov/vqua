const { Component, html } = require('vqua')

const Sidebar = require('../Sidebar')
const Content = require('../Content')

class App extends Component {

  passContext() {

    const locale = ['en','ru'].indexOf(this.props.locale) > -1
      ? this.props.locale
      : 'en'

    return {
      locale,
      path: this.props.path,
      segments: this.props.segments,
      humanId: this.props.humanId,
    }
  }

  render() {
    return [
      Sidebar.v(),
      Content.v({},
        this.props.childs
      )
    ]
  }

}

module.exports = App
