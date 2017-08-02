const { Component, html } = require('vqua')
const MenuItems = require('..//MenuItems')
const t = require('../../translations')

const items = [
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
    href: '/:locale/lifecycle-hooks',
    key: 'lifecycleHooks'
  },
  {
    href: '/:locale/references',
    key: 'references'
  },
  {
    href: '/:locale/server-prerender',
    key: 'serverRender'
  },
  {
    href: '/:locale/router',
    key: 'router'
  },
]

const itemsMatcher = (items, segments) => {

  return items.href.split('/')[2] == segments[1]

}

class MenuGuide extends Component {

  static injectContext() {

    return ['locale', 'router']

  }

  constructor(props, context) {

    super(props, context)

  }

  render() {

    const { locale, router } = this.context


    const decoratedItems = items.map((item) => {

      const routerSegment = router.segments[1]

      const linkSegment = item.href.split('/')[2]

      return Object.assign({}, item, {
        name: t[locale].MenuGuide[item.key],
        href: item.href.replace(':locale', locale),
        selected: routerSegment == linkSegment
      })

    })

    return (
      MenuItems.v({
        items: decoratedItems,
        matcher: itemsMatcher,
        divClass: 'menu-guide'
      })
    )

  }

}

module.exports = MenuGuide
