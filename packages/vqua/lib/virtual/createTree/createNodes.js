const countDomNodes = require('../countDomNodes')

const createNodes = ({
  liveNodes = [],
  templateNodes = [],
  createNode,
  createOptions = {},
  createContext = {},
  liveParentNode = null,
  filterNodes = (liveNodes, templateNodes) => {
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
  } = filterNodes(liveNodes, templateNodes)

  return filteredLiveNodes.reduce((newLiveNodes, liveNode, index) => {

    const templateNode = filteredTemplateNodes[index] || null

    const {
      newLiveNode,
      isNeedChilds,
      liveChilds,
      templateChilds,
      newContext,
    } = createNode({
      index,
      liveNode,
      templateNode,
      options: createOptions,
      context: createContext,
    })

    if (!newLiveNode) return newLiveNodes

    if (!isNeedChilds) return [ ...newLiveNodes, newLiveNode ]

    const childs =
      createNodes({
        liveParentNode: newLiveNode,
        liveNodes: liveChilds || [],
        templateNodes: templateChilds || [],
        createNode,
        createOptions,
        createContext: newContext,
        filterNodes,
        index
      })

    const nodeIndex =
      createOptions.index
        ? { index }
        : {}

    const childDomNodesCount  =
      createOptions.childDomNodesCount
        ? { childDomNodesCount: countDomNodes(childs) }
        : {}

    const childNodes = { childs }

    const parentNode =
      createOptions.linkParent
        ? { parent: liveParentNode }
        : {}

    const extendedLiveNode =
      Object.assign(
        newLiveNode,
        parentNode,
        childNodes,
        childDomNodesCount,
        nodeIndex
      )

    return [ ...newLiveNodes, extendedLiveNode ]

  }, [])

}

module.exports = createNodes
