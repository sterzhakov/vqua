const mapNodes = require('./mapNodes')

module.exports = (nodes, instance) => {

    return mapNodes(nodes, node => {

      if (node && 'ref' in node && !node.isChildFromProps) {

        return Object.assign({}, node, {
          ref: {
            name: node.ref,
            instance,
          }
        })

      }

      return node

    })

}
