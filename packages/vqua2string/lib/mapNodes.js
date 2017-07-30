const loop = (node, createNode) => {

  if (Array.isArray(node)) {

    const nodes = node

    return nodes.reduce((string, node) => {

      return string + loop(node, createNode)

    }, '')

  } else

  if (typeof node == 'object') {

    const childs = loop(node.childs, createNode)

    return createNode(node, childs)

  } else {

    return null

  }

}

module.exports = loop
