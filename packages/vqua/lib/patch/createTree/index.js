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

        const withDomLiveNodes =
          decorateNodes(liveNodes, {
            dom: domNodes
          })

        const sortedLiveNodes =
          sortLiveNodes(withDomLiveNodes, templateNodes)

        const orderedLiveNodes =
          decorateNodes(sortedLiveNodes, {
            order: { startFrom: offset },
          })

        const decoratedTemplateNodes =
          decorateNodes(templateNodes, {
            order: { startFrom: offset }
          })

        return {
          filteredLiveNodes: orderedLiveNodes,
          filteredTemplateNodes: decoratedTemplateNodes
        }

      }
    })
  )

  return patchNodes


}
