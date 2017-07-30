module.exports = ({ templateNode }) => {

  const newRootNode = {
    type: templateNode.type,
    dom: templateNode.dom,
    childs: templateNode.childs,
  }

  return newRootNode

}
