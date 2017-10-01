const { sortLiveNodes } = require('../../virtual/sortNodes')
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
      filterNodes: (liveNodes, templateNodes, { domNodes } = {}) => {

        const sortedLiveNodes = sortLiveNodes(liveNodes, templateNodes)

        const decoratedLiveNodes =
          decorateNodes(sortedLiveNodes, {
            order: { startFrom: offset },
            dom: domNodes
          })

        const decoratedTemplateNodes =
          decorateNodes(templateNodes, {
            order: { startFrom: offset }
          })

        return {
          filteredLiveNodes: decoratedLiveNodes,
          filteredTemplateNodes: decoratedTemplateNodes
        }

      }
    })
  )

  return patchNodes


}
