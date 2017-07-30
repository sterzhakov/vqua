const vqua2string = require('vqua2string')
const createLiveTree = require('vqua/lib/virtual/createTree')
const filterDomNodes = require('vqua/lib/virtual/filterDomNodes')

module.exports = (request, response, { nodes, layout, context } = {}) => {

  const params = {
    layout: layout || request.config.layout,
    context: context || {},
    nodes
  }

  const templateNodes = Array.isArray(nodes) ? nodes : [nodes]

  const liveNodes =
    createLiveTree([], templateNodes, {
      hooks: false,
      context: params.context,
    })

  const domNodes = filterDomNodes(liveNodes)

  const html = params.layout(vqua2string(domNodes))

  response.statusCode = 200
  response.end(html)

}
