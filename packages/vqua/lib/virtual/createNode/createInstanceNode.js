const { flatten, pick } = require('vqua-utils')
const hookNode = require('../hookNode')
const { INSTANCE_TYPE } = require('../../constants/nodeTypes')
const createNodesWithRefs = require('../createNodesWithRefs')

module.exports = ({
  templateNode,
  context,
  injectedContext = {},
  afterRender,
  beforeRender,
  statistic
} = {}) => {

  const defaultProps = templateNode.class.defaultProps()

  const mergedProps = Object.assign({}, defaultProps, templateNode.props)

  const instance = new templateNode.class(mergedProps, injectedContext)

  if (beforeRender) beforeRender(instance)

  const childs = 'render' in instance && flatten([instance.render()]) || []

  const refParams = templateNode.ref
    ? { ref: templateNode.ref }
    : {}

  const keyParams = templateNode.key
    ? { key: templateNode.key }
    : {}

  const statisticParams = statistic
    ? {
        instanceId: statistic.increaseLastInstanceId(),
        statistic,
      }
    : {}

  const newInstanceNode =
    Object.assign({}, {
      context,
      instance,
      type: INSTANCE_TYPE,
      ref: templateNode.ref,
      childs,
    },
      refParams,
      keyParams,
      statisticParams
    )

  instance.node = newInstanceNode

  return newInstanceNode

}
