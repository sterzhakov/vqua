const { Component, html } = require('vqua')

class Todo extends Component {

  constructor(props, context) {

    super(props, context)

    this.state = {
      tasks: [
        { name: '111', id: 1, completed: false, },
        { name: '222', id: 2, completed: false, },
        { name: '333', id: 3, completed: false, },
      ]
    }

  }

  handleTaskAdd(event) {

    event.preventDefault()

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

  handleTaskToggle(event, task) {

    event.preventDefault()

    this.setState({
      tasks: this.state.tasks.map((_task) => {

        return (_task.id == task.id)
          ? Object.assign({},
              _task,
              { completed: !_task.completed }
            )
          : _task

      })
    })


  }

  handleTaskDelete(event, task) {

    event.preventDefault()

    this.setState({
      tasks: this.state.tasks.filter((_task) => {

        return _task.id != task.id

      })
    })

  }

  render() {

    const { h1, div, a, input, button, br, s } = html

    return (
      div({},
        h1({},
          'Todo app'
        ),
        div({},
          input({
            ref: 'input',
            placeholder: 'todo name'
          }),
          button({
            onClick: (event) => { this.handleTaskAdd(event) },
          }, 'Add')
        ),
        br(),
        this.state.tasks.map((task, index) => {
          return [
            div({ key: task.id },
              a({
                href: '#todo__item__toggle',
                onClick: (event) => { this.handleTaskToggle(event, task) }
              },
                task.completed
                  ? s({}, task.name)
                  : task.name
              ),
              a({
                href: '#todo__item__delete',
                onClick: (event) => { this.handleTaskDelete(event, task) }
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

module.exports = Todo
