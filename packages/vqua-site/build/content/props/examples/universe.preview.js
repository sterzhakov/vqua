const { Component } = require('vqua')

const Hello = require('./hello.preview')

// cut before

class Universe extends Component {

  render() {

    return (
      Hello.v({ name: 'Universe' })
    )

  }

}

// cut after

module.exports = Universe
