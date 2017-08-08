module.exports = ({ templateNode, statistic }) => {

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

  return Object.assign({}, newTagNode, refParams, statisticParams)

}
