const { flatten } = require('vqua-utils')
const createNodes = require('./createNodes')
const createCallback = require('./createCallback')
const { sortLiveNodes, sortTemplateNodes } = require('../sortNodes')
const decorateNodes = require('../decorateNodes')
const createNodesWithRefs = require('../createNodesWithRefs')
const createTextNodes = require('../createTextNodes')
const statistic = require('../Statistic/singleton')

module.exports = (liveNodes, templateNodes, options) => {

  const filterNodes = (liveNodes, templateNodes, liveParentInstanceNode) => {

    const textTemplateNodes =
      createTextNodes(flatten([templateNodes]))

    const refsTemplateNodes =
      createNodesWithRefs(textTemplateNodes, liveParentInstanceNode)

    const sortedTemplateNodes =
      sortTemplateNodes(refsTemplateNodes)


    const decoratedLiveNodes =
      decorateNodes(flatten([liveNodes]), { order: true })

    const sortedLiveNodes =
      sortLiveNodes(decoratedLiveNodes, sortedTemplateNodes)

    return {
      filteredLiveNodes: sortedLiveNodes,
      filteredTemplateNodes: sortedTemplateNodes,
    }

  }

  const nodes =
    createNodes({
      liveNodes,
      templateNodes,
      createNode: createCallback,
      createOptions: {
        hooks: true,
        linkParent: true,
        childDomNodesCount: true,
        index: true,
      },
      liveParentNode: options.liveParentNode || null,
      liveParentInstanceNode: options.liveParentInstanceNode || null,
      createContext: options.context || {},
      filterNodes,
      statistic
    })

  return nodes

}
