const { flatten } = require('vqua-utils')
const createNodes = require('./createNodes')
const createCallback = require('./createCallback')
const { sortLiveNodes, sortTemplateNodes } = require('../sortNodes')
const decorateNodes = require('../decorateNodes')
const createNodesWithRefs = require('../createNodesWithRefs')
const createTextNodes = require('../createTextNodes')

module.exports = (liveNodes, templateNodes, options) => {

  const filterNodes = (liveNodes, templateNodes) => {

    const textTemplateNodes =
      createTextNodes(flatten(templateNodes))

    const sortedTemplateNodes =
      sortTemplateNodes(textTemplateNodes)

    const decoratedLiveNodes =
      decorateNodes(liveNodes, { order: true })

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
        index: true
      },
      liveParentNode: options.liveParentNode || null,
      createContext: options.context || {},
      filterNodes,
    })

  return nodes

}
