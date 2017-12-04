const B = require('berries')
const createNodesWithRefs = require('../createNodesWithRefs')

module.exports = ({
  liveNode,
  templateNode,
  context,
  injectedContext,
}) => {

  const liveType = liveNode.type
  const liveInstance = liveNode.instance

  liveInstance.prevProps = liveInstance.props
  liveInstance.prevState = liveInstance.state
  liveInstance.prevContext = liveInstance.context

  const newProps =
    Object.assign({},
      templateNode.class.defaultProps(),
      templateNode.props
    )

  liveInstance.props = newProps
  liveInstance.state = liveInstance.state
  liveInstance.context = injectedContext

  const keyParams =
    templateNode.key
      ? { key: templateNode.key }
      : {}

  const refParams =
    templateNode.ref
      ? { ref: templateNode.ref }
      : {}

  const childs = createNodesWithRefs(
    B.flatten([ liveInstance.render() || null ]),
    liveInstance
  )

  const newInstanceNode =
    Object.assign({}, {
      context,
      type: liveType,
      instance: liveInstance,
      childs,
    },
      keyParams,
      refParams
    )

  liveInstance.node = newInstanceNode

  return newInstanceNode

}
