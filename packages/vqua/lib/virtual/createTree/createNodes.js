const countDomNodes = require('../countDomNodes')

const createNodes = ({
  liveNodes = [],
  templateNodes = [],
  createNode,
  createOptions = {},
  createContext = {},
  liveParentNode = null,
  liveParentInstanceNode = null,
  filterNodes = (liveNodes, templateNodes, liveParentInstanceNode) => {
    return {
      filteredLiveNodes: liveNodes,
      filteredTemplateNodes: templateNodes
    }
  }
}) => {

  if (liveNodes.length + templateNodes.length == 0) return []

  const {
    filteredLiveNodes,
    filteredTemplateNodes
  } = filterNodes(liveNodes, templateNodes, liveParentInstanceNode)

  return filteredLiveNodes.reduce((newLiveNodes, liveNode, index) => {

    const templateNode = filteredTemplateNodes[index] || null

    const {
      newLiveNode,
      isNeedChilds,
      liveChilds,
      templateChilds,
      newContext,
      newLiveParentInstanceNode,
    } = createNode({
      index,
      liveNode,
      templateNode,
      options: createOptions,
      context: createContext,
      liveParentInstanceNode,
    })

    if (!newLiveNode) return newLiveNodes

    const nodeIndex =
      createOptions.index
        ? { index }
        : {}

    const parentNode =
      createOptions.linkParent
        ? { parent: liveParentNode }
        : {}

    const newLiveNodeWithInfo =
      Object.assign(
        newLiveNode,
        nodeIndex,
        parentNode,
      )

    if (!isNeedChilds) return [ ...newLiveNodes, newLiveNodeWithInfo ]

    const childs =
      createNodes({
        liveParentNode: newLiveNodeWithInfo,
        liveParentInstanceNode: newLiveParentInstanceNode,
        liveNodes: liveChilds || [],
        templateNodes: templateChilds || [],
        createNode,
        createOptions,
        createContext: newContext,
        filterNodes,
        index,
      })

    const childDomNodesCount =
      createOptions.childDomNodesCount
        ? { childDomNodesCount: countDomNodes(childs) }
        : {}

    const childNodes = { childs }

    const liveNodeWithChilds =
      Object.assign(
        newLiveNodeWithInfo,
        childNodes,
        childDomNodesCount,
      )

    return [ ...newLiveNodes, liveNodeWithChilds ]

  }, [])

}

module.exports = createNodes
