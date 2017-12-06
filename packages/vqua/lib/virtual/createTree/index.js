const B = require('berries')
const createNodes = require('./createNodes')
const createCallback = require('./createCallback')
const { sortLiveNodes, sortTemplateNodes } = require('../sortNodes')
const decorateNodes = require('../decorateNodes')
const createNodesWithRefs = require('../createNodesWithRefs')
const createTextNodes = require('../createTextNodes')

module.exports = (liveNodes, templateNodes, options = {}) => {

  const filterNodes = (liveNodes, templateNodes, liveParentInstanceNode) => {

    const textTemplateNodes =
      createTextNodes(B.flatten([templateNodes]))

    const sortedTemplateNodes =
      sortTemplateNodes(textTemplateNodes)

    const sortedLiveNodes =
      sortLiveNodes(liveNodes, { templateNodes: sortedTemplateNodes })

    return {
      filteredLiveNodes: sortedLiveNodes,
      filteredTemplateNodes: sortedTemplateNodes,
    }

  }

  return createNodes({
    liveNodes,
    templateNodes,
    createNode: createCallback,
    createOptions: {
      hooks: options.hooks,
      linkParent: true,
      childDomNodesCount: true,
      index: true,
    },
    liveParentNode: options.liveParentNode || null,
    liveParentInstanceNode: options.liveParentInstanceNode || null,
    createContext: options.context || {},
    filterNodes
  })

}
