const loop = (htmlNode, createNode) => {

  if (Array.isArray(htmlNode)) {

    return htmlNode.reduce((vquaNodes, _htmlNode) => {

      const vquaNode = loop(_htmlNode, createNode)

      return vquaNode ? [ ...vquaNodes, vquaNode ] : vquaNodes

    }, [])

  } else {

    const childs = htmlNode.child ? loop(htmlNode.child, createNode) : null

    const vquaNode = createNode(htmlNode)

    if (!vquaNode || typeof vquaNode == 'string') {

      return vquaNode

    } else {

      const vquaChilds = { childs: childs || [] }

      return Object.assign({}, vquaNode, vquaChilds)

    }

  }

}

module.exports = (htmlNode, createNode) => {

  return loop(htmlNode, createNode)

}
