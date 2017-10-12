const { sortLiveNodes } = require('../../virtual/sortNodes')
const reorderDeletedLiveNodes = require('../../virtual/reorderDeletedLiveNodes')
const reorderAddedLiveNodes = require('../../virtual/reorderAddedLiveNodes')
const decorateNodes = require('../../virtual/decorateNodes')
const createNodes = require('./createNodes')
const createCallback = require('./createCallback')

module.exports = ({ offset, liveNodes, templateNodes, domNodes }) => {

  const patchNodes = (
    createNodes({
      offset,
      limit: templateNodes.length,
      liveNodes,
      templateNodes,
      createNode: createCallback,
      domNodes,
      filterNodes: (liveNodes, templateNodes, { domNodes, offset } = {}) => {

        const orderedTemplateNodes =
          decorateNodes(templateNodes, {
            order: { startFrom: offset }
          })

        const withDomLiveNodes =
          decorateNodes(liveNodes, {
            dom: domNodes,
            order: { startFrom: offset },
          })

        const sortedLiveNodes =
          sortLiveNodes(withDomLiveNodes, {
            templateNodes: orderedTemplateNodes
          })

        const reorderedDeletedLiveNodes =
          reorderDeletedLiveNodes(sortedLiveNodes, {
            templateNodes: orderedTemplateNodes,
            offset,
          })

        const reorderedAddedLiveNodes =
          reorderAddedLiveNodes(reorderedDeletedLiveNodes, {
            templateNodes: orderedTemplateNodes
          })

        return {
          filteredLiveNodes: reorderedAddedLiveNodes,
          filteredTemplateNodes: orderedTemplateNodes
        }

      }
    })
  )

  return patchNodes

}
