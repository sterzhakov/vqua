const mapNodes = require('./mapNodes')

module.exports = (nodes, parentNodeInstance, coreInstance) => {

    return mapNodes(nodes, node => {

      if (
        node && typeof node.ref == 'string' &&
        coreInstance.updateId == node.lastUpdateId
      ) {

        return Object.assign({}, node, {
          ref: {
            name: node.ref,
            instance: parentNodeInstance,
          }
        })

      }

      return node

    })

}
