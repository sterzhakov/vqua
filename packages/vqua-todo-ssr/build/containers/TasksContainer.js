const { Component, html } = require('vqua')

class TasksContainer extends Component {

  constructor(props, context) {

    super(props, context)

    this.state = {
      tasks: [
        { name: '123', id: 1, completed: false, },
        { name: '321', id: 2, completed: false, },
        { name: 'asd', id: 3, completed: false, },
      ]
    }

  }

  handleTodoAdd() {

    const { input } = this.refs

    if (input.value.trim().length > 0) {

      this.setState({
        tasks: [
          {
            id: Date.now(),
            name: input.value,
            completed: false,
          },
          ...this.state.tasks
        ]
      })

      input.value = ''

    }

  }

  handleTaskToggle(task) {

    const tasks = this.state.tasks.map((_task) => {

      return (_task.id == task.id)
        ? Object.assign({},
            _task,
            { completed: !_task.completed }
          )
        : _task

    })

    this.setState({ tasks })


  }

  render() {

    const { h1, div, a, input, button, br, s } = html

    return (
      div({ class: 'todo' },
        h1({},
          'Todo app'
        ),
        div({ class: 'todo__add' },
          input({
            class: 'todo__add__input',
            ref: 'input',
            placeholder: 'todo name'
          }),
          button({
            onClick: () => { this.handleTodoAdd() },
            class: 'todo__add__button',
          }, 'Add')
        ),
        br(),
        this.state.tasks.map((task, index) => {
          return [
            a({
              class: 'todo__item',
              href: '#todo__item__toggle',
              key: task.id,
              onClick: () => { this.handleTaskToggle(task) }
            },
              task.completed
                ? s({}, task.name)
                : task.name
            ),
            br({ key: task.id + '_br', })
          ]
        })
      )
    )

  }

}

module.exports = TasksContainer
