module.exports = ({ templateNode }) => {

  const newTagNode = {
    type: templateNode.type,
    text: templateNode.text,
  }

  return newTagNode

}
