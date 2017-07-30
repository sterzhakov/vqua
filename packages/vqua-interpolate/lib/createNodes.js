const loop = ({ nodes, createNode, filterNodes }) => {

  if (Array.isArray(nodes)) {

    const newNodes = nodes.reduce((newNodes, node) => {

      const newNode = loop({ nodes: node, createNode, filterNodes })

      return Array.isArray(newNode)
        ? [ ...newNodes, ...newNode ]
        : [ ...newNodes, newNode ]

    }, [])

    const filteredNodes = filterNodes
      ? filterNodes(newNodes)
      : newNodes

    return filteredNodes

  } else {

    const node = nodes

    const newNode = createNode(node)

    const isNodeHasChilds = (
      typeof newNode == 'object' &&
      newNode.childs &&
      newNode.childs.length > 0
    )

    if (isNodeHasChilds) {

      const childs = loop({ nodes: newNode.childs, createNode, filterNodes })

      return Object.assign({}, newNode, { childs })

    }

    return newNode

  }

}

module.exports = params => loop(params || {})
