const B = require('berries')

const addRef = (node, payload) => {

  node.ref.instance.refs =
    Object.assign({}, node.ref.instance.refs, {
      [node.ref.name]: payload
    })

}

const removeRef = (node) => {

  node.ref.instance.refs =
    B.omit(node.ref.instance.refs, node.ref.name)

}

module.exports = { addRef, removeRef }
