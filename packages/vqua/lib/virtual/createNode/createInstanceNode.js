const B = require('berries')
const hookNode = require('../hookNode')
const { INSTANCE_TYPE } = require('../../constants/nodeTypes')
const createNodesWithRefs = require('../createNodesWithRefs')

module.exports = ({
  templateNode,
  context,
  injectedContext = {},
  afterRender,
  beforeRender,
} = {}) => {

  const newProps = Object.assign({},
    templateNode.class.defaultProps(),
    templateNode.props
  )

  const instance = new templateNode.class(newProps, injectedContext)

  if (beforeRender) beforeRender(instance)

  const refParams = typeof templateNode.ref == 'string'
    ? { ref: templateNode.ref }
    : {}

  const keyParams = templateNode.key
    ? { key: templateNode.key }
    : {}

  const childs = createNodesWithRefs(
    B.flatten([ instance.render() || null ]),
    instance,
  )

  const newInstanceNode =
    Object.assign({}, {
      context,
      instance,
      type: INSTANCE_TYPE,
      ref: templateNode.ref,
      childs,
    },
      refParams,
      keyParams
    )

  instance.node = newInstanceNode

  return newInstanceNode

}
