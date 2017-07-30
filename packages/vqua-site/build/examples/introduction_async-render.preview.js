const { Component } = require('vqua')

// cut before

class Frank extends Component {

  static defaultProps() {

    return (resolve) => {

      setTimeout(() => {

        resolve({ lyrics: 'New York, New York...' })

      }, 1500)

    }

  }

  render() {

    return this.props.lyrics

  }

}

// cut after

module.exports = Frank
