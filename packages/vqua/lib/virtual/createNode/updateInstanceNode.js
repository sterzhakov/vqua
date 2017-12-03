const { flatten, pick } = require('berries')

module.exports = ({
  liveNode,
  templateNode,
  context,
  injectedContext,
  statistic
}) => {

  const liveType = liveNode.type
  const liveInstance = liveNode.instance

  liveInstance.prevProps = liveInstance.props
  liveInstance.prevState = liveInstance.state
  liveInstance.prevContext = liveInstance.context

  const defaultProps = templateNode.class.defaultProps()

  const mergedProps = Object.assign({}, defaultProps, templateNode.props)

  liveInstance.props = mergedProps
  liveInstance.state = liveInstance.state

  liveInstance.context = injectedContext

  const childs = flatten([liveInstance.render() || null])

  const statisticParams = statistic
    ? {
        statistic,
        instanceId: statistic.getLastInstanceId(),
      }
    : {}

  const newInstanceNode =
    Object.assign({}, {
      context,
      type: liveType,
      instance: liveInstance,
      childs,
    }, statisticParams)

  liveInstance.node = newInstanceNode

  return newInstanceNode

}
