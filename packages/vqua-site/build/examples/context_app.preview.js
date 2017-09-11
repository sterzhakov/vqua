const { Component } = require('vqua')

// cut before

class User extends Component {

  static injectContext() {

    return ['username']

  }

  render() {

    return this.context.username

  }

}

class App extends Component {

  passContext() {

    return {
      username: 'Igor',
    }

  }

  render() {

    return User.v()

  }

}

// cut after

module.exports = App
