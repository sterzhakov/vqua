module.exports = ({ templateNode, statistic }) => {

  const keyParams =
    templateNode.key
      ? { key: templateNode.key }
      : {}

  const refParams =
    templateNode.ref
      ? { ref: templateNode.ref }
      : {}

  const statisticParams = statistic
    ? { statistic }
    : {}

  const newTagNode = {
    type: templateNode.type,
    tag: templateNode.tag,
    props: templateNode.props,
    childs: templateNode.childs,
  }

  const propsParams =
    templateNode.key
      ? {
          props: Object.assign({}, templateNode.props, {
            'data-vqua-key': templateNode.key
          })
        }
      : {}


  return Object.assign({},
    newTagNode,
    refParams,
    statisticParams,
    keyParams,
    propsParams,
  )

}
