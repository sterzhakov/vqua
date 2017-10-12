const { Component } = require('vqua')

const Todo = require('../components/Todo')

class TasksContainer extends Component {

  render() {

    return Todo.v()

  }

}

module.exports = TasksContainer
