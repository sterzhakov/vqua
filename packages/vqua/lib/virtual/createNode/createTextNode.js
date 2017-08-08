module.exports = ({ templateNode, statistic }) => {

  const statisticParams = statistic
    ? { statistic }
    : {}

  const newTagNode = {
    type: templateNode.type,
    text: templateNode.text,
  }

  return Object.assign({}, newTagNode, statisticParams)

}
