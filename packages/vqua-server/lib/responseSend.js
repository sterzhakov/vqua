const vqua2string = require('vqua2string')
const createLiveTree = require('vqua/lib/virtual/createTree')
const filterDomNodes = require('vqua/lib/virtual/filterDomNodes')

module.exports = (request, response, { node, props, context, layout } = {}) => {

  const params = {
    layout: layout || request.config.layout,
    context: context || {},
    node
  }

  const templateNodes = [ node.v(props) ]

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
