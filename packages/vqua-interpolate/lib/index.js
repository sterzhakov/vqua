const createNodes = require('./createNodes')
const replaceVariables = require('./replaceVariables')
const mergeNearbyStrings = require('./mergeNearbyStrings')

module.exports = (nodes, data) => {

  const createNode = (node) => {

    return (typeof node == 'string')
      ? replaceVariables(node, data)
      : node

  }

  const filterNodes = (nodes) => {

    return mergeNearbyStrings(nodes)

  }

  return createNodes({ nodes, createNode, filterNodes })

}
