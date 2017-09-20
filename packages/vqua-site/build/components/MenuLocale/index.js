const { Component, html } = require('vqua')
const { classNames } = require('vqua-utils')
const MenuItems = require('..//MenuItems')

const replacePathLocale = (pathname, locale) => {

  const newPathname = pathname.replace(/^\/([^\/]+)(\/|$)/, '/' + locale + '/')

  return newPathname.slice(-1) == '/'
    ? newPathname.slice(0, newPathname.length - 1)
    : newPathname

}

class MenuLocale extends Component {

  static injectContext() {

    return ['locale', 'path', 'navigate']

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

    const { locale, navigate } = this.context

    if (locale != item.locale) {

      navigate(event.target.pathname)

    }

  }

  render() {

    const { locale, path } = this.context

    const { div, a, p } = html

    return (
      div({ class: 'sidebar__item locale-items' },

        this.items.map((item) => {

          return (() => {

            if (item.separator) {

              return (
                a({ class: 'locale-items__separator' },
                  item.separator
                )
              )

            } else {

              const href = item.locale == locale
                ? path
                : replacePathLocale(path, item.locale)

              const aProps = {
                href,
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
