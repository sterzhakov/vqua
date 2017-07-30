const { TAG_TYPE, TEXT_TYPE } = require('vqua/lib/constants/nodeTypes')
const convertTag = require('./convertTag')
const convertText = require('./convertText')
const mapNodes = require('./mapNodes')

module.exports = (nodes) => {

  return mapNodes(nodes, (node, childs = '') => {

    return (node.type == TAG_TYPE)
      ? convertTag(node, childs)
      : convertText(node)

  })

}
