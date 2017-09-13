const path = require('path')
const vqua2string = require('vqua2string')
const createLiveTree = require('vqua/lib/virtual/createTree')
const filterDomNodes = require('vqua/lib/virtual/filterDomNodes')
const { htmlQuotes } = require('vqua-utils')

module.exports = (
  request,
  response,
  {
    name,
    props,
    context,
    layout
  } = {}
) => {

  const params = {
    layout: layout || request.config.layout,
  }

  const containerPath =
    path.join(
      request.config.buildPath,
      'containers',
      name
    )

  const container = require(containerPath)

  const templateNodes = [ container.v(props, context) ]

  const liveNodes =
    createLiveTree([], templateNodes, {
      hooks: false,
      context: params.context,
    })

  const domNodes = filterDomNodes(liveNodes)

  const data = JSON.stringify({ name, props, context })

  const encodedData = htmlQuotes.encode(data)

  const html = vqua2string(domNodes)

  const result = params.layout(html, encodedData)

  response.statusCode = 200
  response.end(result)

}
