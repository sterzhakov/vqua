const { compose } = require('vqua-utils')
const { TAG_TYPE } = require('vqua/lib/constants/nodeTypes')
const { filterSpaces } = require('./filterText')

const filterText = compose(filterSpaces)

module.exports = (htmlNode) => {

  if (!htmlNode) return null

  if (htmlNode.node == 'element') {

    return {
      type: TAG_TYPE,
      tag: htmlNode.tag,
      props: htmlNode.attr || {},
    }

  } else

  if (htmlNode.node == 'text') {

    const filteredText = filterText(htmlNode.text)

    return (filteredText.length == 0) ? null : filteredText

  } else {

    return null
  }

}
