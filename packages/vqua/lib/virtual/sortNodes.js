const { flatten, include } = require('vqua-utils')


const isKeyedNode = node => {
  return Boolean(node && node.key)
}


const getLivePairForTemplate = (liveNode, templateNode, keyedLiveNodes) => {

  if (isKeyedNode(templateNode)) {

    return keyedLiveNodes[templateNode.key] || null

  } else

  if (isKeyedNode(liveNode)) {

    return null

  } else

  if (!templateNode) {

    return null

  } else {

    return liveNode || null

  }
}


const wrapNodesWithTheirKeys = (nodes) => (
  nodes.reduce((keyedNodes, node) => (
    (node && node.key)
      ? Object.assign({}, keyedNodes, { [node.key]: node })
      : keyedNodes
  ), {})
)


const sortUsedLiveNodes = ({ liveNodes, templateNodes, keyedLiveNodes }) => {

  if (!templateNodes) return []

  return templateNodes.map((templateNode, index) => {

    return getLivePairForTemplate(
      liveNodes[index],
      templateNode,
      keyedLiveNodes
    )

  })

}


const sortUnusedLiveNodes = ({ liveNodes, usedOrderIndexes }) => {

  return liveNodes.filter((liveNode) => {

    return !include(usedOrderIndexes, liveNode.order)

  })

}


const sortLiveNodes = (liveNodes = [], templateNodes = []) => {

  const keyedLiveNodes = wrapNodesWithTheirKeys(liveNodes)

  const usedLiveNodes =
    sortUsedLiveNodes({
      liveNodes,
      templateNodes,
      keyedLiveNodes
    })

  const usedOrderIndexes =
    usedLiveNodes.reduce((indexes, usedLiveNode) => {
      return usedLiveNode ? [ ...indexes, usedLiveNode.order ] : indexes
    }, [])

  const unusedLiveNodes =
    sortUnusedLiveNodes({
      liveNodes,
      usedOrderIndexes
    })

  return [ ...usedLiveNodes, ...unusedLiveNodes ]

}


const sortTemplateNodes = (templateNodes = []) => {

  return flatten([templateNodes]).filter(node => node != null)

}


module.exports = {
  sortLiveNodes,
  sortTemplateNodes,
  wrapNodesWithTheirKeys,
  getLivePairForTemplate,
  isKeyedNode,
  sortUsedLiveNodes,
  sortUnusedLiveNodes,
}
