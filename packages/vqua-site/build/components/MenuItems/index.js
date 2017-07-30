const { Component, html } = require('vqua')
const { classNames, omit } = require('vqua-utils')
const { Link } = require('vqua-router')

class MenuItems extends Component {

  static defaultProps() {

    return {
      items: [],
      divClass: '',
      aClass: '',
    }

  }

  afterUpdate() {

    console.log('update')

  }

  render() {

    const { div, a } = html

    return (

      div({ class: classNames('menu-items', this.props.divClass) },

        this.props.items.map((item) => {

          const linkProps =
            Object.assign({}, omit(item, 'name', 'external', 'key'), {
              class: classNames(
                'menu-items__item',
                this.props.aClass,
                { 'menu-items__item--selected': item.selected }
              ),
            })

          return item.external
            ? a(linkProps, item.name)
            : Link.v(linkProps, item.name)

        })

      )

    )

  }

}

module.exports = MenuItems
