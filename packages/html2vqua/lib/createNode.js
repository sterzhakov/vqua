const { compose } = require('berries')
const { TAG_TYPE } = require('vqua/lib/constants/nodeTypes')
const { filterSpaces } = require('./filterText')

const filterText = compose(filterSpaces)

module.exports = (htmlNode) => {

  if (!htmlNode) return null

  if (htmlNode.node == 'element') {

    const propKeys = Object.keys(htmlNode.attr || {})

    const props = propKeys.reduce((props, key) => {

      const value = htmlNode.attr[key]

      const newValue = Array.isArray(value)
        ? value.join(' ')
        : value

      return Object.assign({}, props, { [key]: newValue })

    }, {})

    return {
      type: TAG_TYPE,
      tag: htmlNode.tag,
      props,
    }

  } else

  if (htmlNode.node == 'text') {

    const filteredText = filterText(htmlNode.text)

    return (filteredText.length == 0) ? null : filteredText

  } else {

    return null
  }

}
