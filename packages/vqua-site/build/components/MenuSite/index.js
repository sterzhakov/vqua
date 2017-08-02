const { Component, html } = require('vqua')
const MenuItems = require('..//MenuItems')

class MenuSite extends Component {

  constructor(props, context) {

    super(props, context)

    this.items = [
      {
        href: 'https://github.com/sterjakovigor/vqua',
        target: '_blank',
        name: 'Github',
        external: true,
      },
      {
        href: 'https://www.npmjs.com/package/vqua',
        target: '_blank',
        name: 'Npm',
        external: true,
      },
    ]

  }

  render() {

    return (
      MenuItems.v({ items: this.items, divClass: 'menu-site' })
    )

  }

}

module.exports = MenuSite
