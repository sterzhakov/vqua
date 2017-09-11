const { Component, html } = require('vqua')

// cut before

class Hello extends Component {

  afterMount() {

    setTimeout(() => {

      this.refs.text.style = 'color: tomato;'

    }, 1000)

  }

  render() {

    const { p } = html

    return (
      p({ ref: 'text' },
        'Hello world'
      )
    )

  }

}

// cut after

module.exports = Hello
