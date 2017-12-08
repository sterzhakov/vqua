const path = require('path')
const vqua2string = require('vqua2string')
const createLiveTree = require('vqua/lib/virtual/createTree')
const filterDomNodes = require('vqua/lib/virtual/filterDomNodes')
const B = require('berries')

module.exports = (request, response, params) => {

  const { config } = request

  const componentPath =
    path.join(config.componentPath, params.componentName)

  const Component = require(componentPath)


  const templateNode = (() => {

    if (!params.componentLayout) {

      return Component.v(params.props)

    }

    const containerPath =
      path.join(config.componentLayoutPath, params.componentLayout.name)


    const Container = require(containerPath)

    return (
      Container.v(params.componentLayout.props,
        Component.v(params.props)
      )
    )

  })()

  const templateNodes = [ templateNode ]

  const liveNodes = createLiveTree([], templateNodes, {
    hooks: false, context: params.context
  })

  const domNodes = filterDomNodes(liveNodes)

  const data = {
    statusCode: params.statusCode,
    componentName: params.componentName,
    params: B.omit(params, 'statusCode', 'componentName')
  }

  const html = vqua2string(domNodes)

  const layout = params.layout || config.layout

  const result = layout(html, data)

  response.statusCode = params.statusCode

  response.end(result)

}
