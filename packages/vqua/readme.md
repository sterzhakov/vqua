[← back](https://github.com/sterjakovigor/vqua/tree/master)

# Vqua - virtual dom library

Vqua is a JavaScript library for creating web interfaces, oriented on
creation isomorphic / universal applications. Or speaking in a simpler
language then your site will be better indexed by search engines.

Example counter:

```javascript

  const { Component, html } = require('vqua')

  class Counter extends Component {

    constructor(props, context) {

      super(props, context)

      this.state = { counter: 0 }

    }

    handleClick() {

      this.setState({ counter: this.state.counter + 1 })

    }

    render() {

      const { a, div } = html

      return (
        div({},
          this.state.counter,
          a({ onClick: () => { this.handleClick() } },
            'Click me!'
          )
        )
      )

    }

  }

```


[Documentation](http://vqua.org/en) /
[Документация](http://vqua.org/ru)
