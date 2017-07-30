const decorateOrder = ({ startFrom, index }) => {
  return { order: startFrom + index }
}

const decorateDom = ({ dom, index }) => {
  return { dom: dom[index] }
}

module.exports = (nodes, { dom = false, order = false }) => {

  if (!nodes) return []

  return nodes.map((liveNode, index) => {

    const nodeOrder = (
      order
        ? decorateOrder({ index, startFrom: order.startFrom || 0 })
        : {}
    )

    const nodeDom = (
      dom
        ? decorateDom({ dom, index })
        : {}
    )

    return Object.assign({}, liveNode, nodeDom, nodeOrder)

  })

}
