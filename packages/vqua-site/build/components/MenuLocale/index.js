const { Component, html } = require('vqua')
const { classNames } = require('vqua-utils')
const MenuItems = require('..//MenuItems')

class MenuLocale extends Component {

  static injectContext() {

    return ['locale', 'router']

  }

  constructor(props, context) {

    super(props, context)

    this.items = [
      {
        name: 'Русский',
        locale: 'ru',
      },
      {
        separator: '/',
      },
      {
        name: 'English',
        locale: 'en'
      },
    ]

  }

  handleClick(event, item) {

    event.preventDefault()

    const { locale, router } = this.context

    if (locale != item.locale) {

      const path =
        '/' +
        location.pathname
          .split('/')
          .filter(segment => segment)
          .map((segment, index) => {
            return (index == 0) ? item.locale : segment
          })
          .join('/')

      history.pushState({}, '', path)

      router.handleClick(path)


    }


  }

  render() {

    const { locale } = this.context

    const { div, a, p } = html

    return (
      div({ class: 'sidebar__item locale-items' },

        this.items.map((item) => {

          return (() => {

            if (item.separator) {

              return (
                p({ class: 'locale-items__separator' },
                  item.separator
                )
              )

            } else {


              const aProps = {
                class: classNames(
                  'locale-items__item',
                  { 'locale-items__item--selected': item.locale == locale }
                ),
                onClick: event => this.handleClick(event, item)
              }

              return (
                a(aProps, item.name)
              )

            }

          })()

        })

      )
    )

  }

}

module.exports = MenuLocale
