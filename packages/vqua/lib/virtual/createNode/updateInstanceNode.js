const { flatten, pick } = require('vqua-utils')
const createNodesWithRefs = require('../createNodesWithRefs')

module.exports = ({ liveNode, templateNode, context }) => {

  const liveType = liveNode.type
  const liveInstance = liveNode.instance

  liveInstance.prevProps = liveInstance.props
  liveInstance.prevState = liveInstance.state
  liveInstance.prevContext = liveInstance.context

  liveInstance.props = templateNode.props
  liveInstance.state = liveInstance.state

  const injectedContext =
    liveInstance.constructor.injectContext
      ? pick(context, ...liveInstance.constructor.injectContext())
      : {}

  liveInstance.context = injectedContext

  const childs = flatten([liveInstance.render() || null])

  const childsWithRefs = createNodesWithRefs(childs, liveInstance)

  const newInstanceNode = {
    context,
    type: liveType,
    instance: liveInstance,
    childs: childsWithRefs,
  }

  liveInstance.node = newInstanceNode

  return newInstanceNode

}
