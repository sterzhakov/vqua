const { Component, html } = require('vqua')
const { classNames } = require('vqua-utils')
const MenuItems = require('..//MenuItems')

const replacePathLocale = (pathname, locale) => {
  return pathname.replace(/(^\/)[A-z]+/, '$1' + locale)
}

class MenuLocale extends Component {

  static injectContext() {

    return ['locale', 'url']

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

      router.handleClick(url)


    }


  }

  render() {

    const { locale, url } = this.context

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
                ? url
                : replacePathLocale(url, item.locale)

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
