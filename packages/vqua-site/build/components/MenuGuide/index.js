const { Component, html } = require('vqua')
const MenuItems = require('..//MenuItems')
const translations = require('../../translations')

const decorateItems = ({ items, locale, segments, translations }) => {

  return items.map((item) => {

    const linkSegment = item.href.split('/')[2]

    return Object.assign({}, item, {
      name: translations[locale].MenuGuide[item.key],
      href: item.href.replace(':locale', locale),
      selected: segments[1] == linkSegment
    })

  })

}

const internalItems = [
  {
    href: '/:locale',
    key: 'introduction'
  },
  {
    href: '/:locale/fast-start',
    key: 'fastStart'
  },
  {
    href: '/:locale/state',
    key: 'state'
  },
  {
    href: '/:locale/props',
    key: 'props'
  },
  {
    href: '/:locale/context',
    key: 'context'
  },
  {
    href: '/:locale/hooks',
    key: 'hooks'
  },
  {
    href: '/:locale/references',
    key: 'references'
  },
]

const externalItems = [
  {
    href: '/:locale/server-render',
    key: 'serverRender'
  },
  {
    href: '/:locale/create-server',
    key: 'createServer'
  },
  {
    href: '/:locale/browser-navigation',
    key: 'browserNavigation'
  },
  {
    href: '/:locale/router',
    key: 'router'
  },
  {
    href: '/:locale/boilerplate',
    key: 'boilerplate'
  },
]

const itemsMatcher = (items, segments) => {

  return items.href.split('/')[2] == segments[1]

}

class MenuGuide extends Component {

  static injectContext() {

    return ['locale', 'segments']

  }

  constructor(props, context) {

    super(props, context)

  }

  render() {

    const { locale, segments } = this.context

    const { hr } = html

    const decoratedInternalItems =
      decorateItems({
        items: internalItems,
        locale,
        segments,
        translations,
      })

    const decoratedExternalItems =
      decorateItems({
        items: externalItems,
        locale,
        segments,
        translations,
      })

    return [
      MenuItems.v({
        items: decoratedInternalItems,
        matcher: itemsMatcher,
        divClass: 'menu-guide'
      }),
      hr({ class: 'sidebar__linebreak' }),
      MenuItems.v({
        items: decoratedExternalItems,
        matcher: itemsMatcher,
        divClass: 'menu-guide'
      }),
    ]

  }

}

module.exports = MenuGuide
