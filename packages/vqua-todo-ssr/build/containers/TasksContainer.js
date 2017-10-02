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

  handleTaskAdd() {

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

    const tasks = this.state.tasks.map  ((_task) => {

      return (_task.id == task.id)
        ? Object.assign({},
            _task,
            { completed: !_task.completed }
          )
        : _task

    })

    this.setState({ tasks })


  }

  handleTaskDelete(task) {

    const tasks = this.state.tasks.filter((_task) => {

      return _task.id != task.id

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
            onClick: () => { this.handleTaskAdd() },
            class: 'todo__add__button',
          }, 'Add')
        ),
        br(),
        this.state.tasks.map((task, index) => {
          return [
            div({ class: 'todo__item', key: task.id },
              a({
                class: 'todo__item',
                href: '#todo__item__toggle',
                onClick: () => { this.handleTaskToggle(task) }
              },
                task.completed
                  ? s({}, task.name)
                  : task.name
              ),
              a({
                class: 'todo__delete',
                href: '#todo__item__delete',
                onClick: () => { this.handleTaskDelete(task) }
              },
                '[x]'
              ),
              br()
            )
          ]
        })
      )
    )

  }

}

module.exports = TasksContainer
