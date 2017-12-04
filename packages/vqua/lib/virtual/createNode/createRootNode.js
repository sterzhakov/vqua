module.exports = ({ templateNode }) => {

  return {
    type: templateNode.type,
    dom: templateNode.dom,
    childs: templateNode.childs,
  }

}
