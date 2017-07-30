const mapNodes = require('./mapNodes')

module.exports = (nodes, instance) => {

  if (!nodes) return []

  return mapNodes(nodes, (node) => {

    if (node && node.ref) {

      return Object.assign({}, node, {
        ref: {
          instance,
          name: node.ref,
        }
      })

    }

    return node

  })

}
