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
            dom: domNodes,
            order: { startFrom: offset },
          })

        const sortedLiveNodes =
          sortLiveNodes(withDomLiveNodes, templateNodes)

        const decoratedTemplateNodes =
          decorateNodes(templateNodes, {
            order: { startFrom: offset }
          })

        return {
          filteredLiveNodes: sortedLiveNodes,
          filteredTemplateNodes: decoratedTemplateNodes
        }

      }
    })
  )

  return patchNodes

}
