const { Component } = require('vqua')

// cut before

class Hello extends Component {

  static defaultProps() {

    return {
      name: 'World'
    }

  }

  render() {

    return (
      'Hello, ' + this.props.name + '!'
    )

  }

}

// cut after

module.exports = Hello
