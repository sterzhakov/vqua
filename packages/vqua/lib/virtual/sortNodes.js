const B = require('berries')


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


const wrapNodesWithTheirKeys = (nodes) => {
  return nodes.reduce((keyedNodes, node) => {
    return (node && node.key)
      ? Object.assign({}, keyedNodes, { [node.key]: node })
      : keyedNodes
  }, {})
}


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


const sortUnusedLiveNodes = ({ liveNodes, usedLiveIds }) => {

  return liveNodes.filter((liveNode, index) => {

    return !B.include(usedLiveIds, liveNode.id)

  })

}


const sortLiveNodes = (liveNodes = [], { templateNodes = [] }) => {

  const liveSortableNodes = liveNodes.map((node, index) => {

    return { id: index, key: node.key, node }

  })

  const keyedLiveNodes = wrapNodesWithTheirKeys(liveSortableNodes)

  const usedLiveNodes =
    sortUsedLiveNodes({
      liveNodes: liveSortableNodes,
      templateNodes,
      keyedLiveNodes
    })

  const usedLiveIds = usedLiveNodes.reduce((ids, usedLiveNode, index) => {
    return Number.isInteger(usedLiveNode && usedLiveNode.id)
      ? [ ...ids, usedLiveNode.id ]
      : ids
  }, [])

  const unusedLiveNodes =
    sortUnusedLiveNodes({
      liveNodes: liveSortableNodes,
      usedLiveIds
    })

  const sortableLiveNodes = [ ...usedLiveNodes, ...unusedLiveNodes ]

  return sortableLiveNodes.map((sortableNode) => {

    return sortableNode
      ? sortableNode.node
      : sortableNode

  })

}


const sortTemplateNodes = (templateNodes = []) => {

  return B.flatten([templateNodes]).filter(node => node != null)

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
