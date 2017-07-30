const { flatten, pick } = require('vqua-utils')
const hookNode = require('../hookNode')
const { INSTANCE_TYPE } = require('../../constants/nodeTypes')
const createNodesWithRefs = require('../createNodesWithRefs')

module.exports = ({
  templateNode,
  context,
  afterRender,
  beforeRender
} = {}) => {

  const injectedContext =
    templateNode.class.injectContext
      ? pick(context, ...templateNode.class.injectContext())
      : {}

  const defaultProps = templateNode.class.defaultProps()

  const mergedProps = Object.assign({}, defaultProps, templateNode.props)

  const instance = new templateNode.class(mergedProps, injectedContext)

  if (beforeRender) beforeRender(instance)

  const childs = 'render' in instance && flatten([instance.render()]) || null

  const refParams =
    templateNode.ref
      ? { ref: templateNode.ref }
      : {}

  const childsWithRefs = createNodesWithRefs(childs, instance)

  const newInstanceNode =
    Object.assign({}, {
      context,
      instance,
      type: INSTANCE_TYPE,
      ref: templateNode.ref,
      childs: childsWithRefs,
    }, refParams)

  instance.node = newInstanceNode

  return newInstanceNode

}
