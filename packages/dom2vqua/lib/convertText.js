const { TEXT_TYPE } = require('vqua/lib/constants/nodeTypes')

module.exports = (node) => {

  return {
    type: TEXT_TYPE,
    text: node.textContent,
    dom: node,
  }

}
