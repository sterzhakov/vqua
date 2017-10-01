module.exports = (nodes, { dom = false, order = false }) => {

  if (!nodes) return []

  const info = nodes.reduce((info, node, index) => {

    if (!node) return {
      nodes: [ ...info.nodes, node ],
      order: info.order,
    }

    const nodeDom = dom
      ? { dom: dom[info.order] }
      : {}

    const startFrom = order.startFrom || 0

    const nodeOrder = order
      ? { order: index + startFrom}
      : {}

    const newNode = Object.assign({}, node, nodeDom, nodeOrder)

    return {
      nodes: [ ...info.nodes, newNode ],
      order: info.order + 1,
    }

  }, { nodes: [], order: 0 })

  return info.nodes

}
