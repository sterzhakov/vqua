// { "showPreview": "false" }
// cut before

const { html, Component, render } = require('vqua')

class HelloWorld extends Component {

  render() {

    const { div } = html

    return (
      div({},
        'Hello world!'
      )
    )

  }

}

const app = document.getElementById('app')

render(app, HelloWorld.v(), (error) => {

  if (error) throw error

})

// cut after

module.exports = HelloWorld
