module.exports = (liveNodes, { templateNodes }) => {

  const matchOrder = (liveNode, templateNode) => {

    return (!templateNode && liveNode)
      ? liveNode.order
      : null

  }

  const orders = liveNodes.reduce((orders, liveNode, index) => {

    const templateNode = templateNodes[index]

    const order = matchOrder(liveNode, templateNode)

    return Number.isInteger(order) ? [ ...orders, order ] : orders

  }, []).sort()

  const rules = orders.map((order, index) => {

    return { order, rate: index + 1 }

  })

  const uncutLiveNodes = liveNodes.slice(0, templateNodes.length)

  const uncutLiveStands = uncutLiveNodes.map((uncutLiveNode, index) => {

    return { index, node: uncutLiveNode }

  })

  const sortedLiveStands = uncutLiveStands.sort((prev, next) => {

    if (prev.node == null) {

      return 1

    } else

    if (next.node == null) {

      return -1

    } else {

      return prev.node.order - next.node.order

    }

  })

  console.log(sortedLiveStands, rules)

  // const { newLiveStands } = sortedLiveStands.reduce((info, liveStand) => {
  //
  //   if (!liveStand.node || info.rules.length == 0) {
  //
  //     return {
  //       rules,
  //       newLiveStands: [ ...info.newLiveStands, liveStand ]
  //     }
  //
  //   } else
  //
  //   // TODO: Переделай в цикл orders
  //
  //   if (rules[1] && liveStand.node.order > rules[1].order) {
  //
  //     const newLiveStand = Object.assign({}, liveStand,
  //       {
  //         node: Object.assign({}, liveStand.node, {
  //           order: liveStand.node.order - rules[1].rate,
  //         })
  //       }
  //     )
  //
  //     return {
  //       rules: rules.slice(1),
  //       newLiveStands: [ ...info.newLiveStands, newLiveStand ]
  //     }
  //
  //   } else
  //
  //   if (liveStand.node.order < rules[0].order) {
  //
  //     const newLiveStand = Object.assign({}, liveStand,
  //       {
  //         node: Object.assign({}, liveStand.node, {
  //           order: liveStand.node.order - rules[0].rate,
  //         })
  //       }
  //     )
  //
  //     return {
  //       rules,
  //       newLiveStands: [ ...info.newLiveStands, liveStand ]
  //     }
  //
  //   }
  //
  //   console.log(liveStand, rules)
  //
  // }, { rules, newLiveStands: [] })

  // const newUncutLiveNodes = newLiveStands
  //   .sort((prev, next) => prev.index - next.index)
  //   .map(newLiveStand => newLiveStand.node)
  //
  //
  // const cutLiveNodes = liveNodes.slice(orders.length)
  //
  // const newCutLiveNodes = cutLiveNodes.map((cutLiveNode) => {
  //
  //   return Object.assign({}, cutLiveNode, {
  //     order: null
  //   })
  //
  // })
  //
  //
  // const newLiveNodes = [ ...newUncutLiveNodes, ...newCutLiveNodes ]
  //
  //
  // return newLiveNodes

}
