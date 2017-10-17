const path = require('path')
const vqua2string = require('vqua2string')
const createLiveTree = require('vqua/lib/virtual/createTree')
const filterDomNodes = require('vqua/lib/virtual/filterDomNodes')

module.exports = (request, response, params) => {

  const { config } = request

  const componentPath = path.join(config.componentPath, params.componentName)

  const component = require(componentPath)

  const templateNodes = [ component.v(params.props, params.context) ]

  const liveNodes = createLiveTree([], templateNodes, {
    hooks: false, context: params.context
  })

  const domNodes = filterDomNodes(liveNodes)

  const data = {
    statusCode: params.statusCode,
    componentName: params.componentName,
    params: {
      props: params.props,
      context: params.context,
    }
  }

  const html = vqua2string(domNodes)

  const layout = params.layout || config.layout

  const result = layout(html, data)

  response.statusCode = params.statusCode

  response.end(result)

}
