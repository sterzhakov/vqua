const { TAG_TYPE } = require('vqua/lib/constants/nodeTypes')

module.exports = (node) => {

  const propsParams = {

    props: Array.from(node.attributes).reduce((props, attribute) => {

      return Object.assign({}, props, {
        [attribute.nodeName]: node.getAttribute(attribute.nodeName)
      })

    }, {})

  }

  const keyParams = 'data-vqua-key' in propsParams.props
    ? { key: propsParams.props['data-vqua-key'] }
    : {}

  return (
    Object.assign({}, propsParams, keyParams, {
      type: TAG_TYPE,
      tag: node.tagName.toLowerCase(),
      dom: node,
    })
  )

}
