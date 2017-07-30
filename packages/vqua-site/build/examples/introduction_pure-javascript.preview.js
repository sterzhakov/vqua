const { html, Component } = require('vqua')

// cut before

class Beatles extends Component {

  render() {

    const { p, a } = html

    return [
      p({ class: 'yellow' },
        'We all live in a yellow submarine',
      ),
      p({ onClick: () => { alert('Hands up!') } },
        'Yellow submarine, yellow submarine'
      ),
    ]

  }

}

// cut after

module.exports = Beatles
