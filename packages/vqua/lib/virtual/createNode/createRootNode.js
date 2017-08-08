module.exports = ({ templateNode, statistic }) => {

  const statisticParams = statistic
    ? { statistic }
    : {}

  const newRootNode = {
    type: templateNode.type,
    dom: templateNode.dom,
    childs: templateNode.childs,
  }

  return Object.assign({}, newRootNode, statisticParams)

}
