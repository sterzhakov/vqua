const { TAG_TYPE } = require('vqua/lib/constants/nodeTypes')

module.exports = (node) => {

  const props = Array.from(node.attributes).reduce((props, attribute) => {

    return Object.assign({}, props, {
      [attribute.nodeName]: node.getAttribute(attribute.nodeName)
    })

  }, {})

  return {
    type: TAG_TYPE,
    props,
    tag: node.tagName.toLowerCase(),
    dom: node,
  }

}
