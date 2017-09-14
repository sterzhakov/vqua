const { Component, html } = require('vqua')

const Hello = require('./hello.preview')

// cut before

class Board extends Component {

  render() {

    const { div } = html

    return (
      div({ id: 'board' },
        this.props.childs
      )
    )

  }

}

const board = Board.v({}, 'Some text!')

// cut after

class Wrapper extends Component {

  render() {

    return board

  }

}


module.exports = Wrapper
