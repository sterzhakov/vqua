module.exports = (liveNodes, { templateNodes }) => {

  const memo = templateNodes.reduce((memo, templateNode, index) => {

    const liveNode = liveNodes[index]

    const newLiveNode = !liveNode || !memo.multipliers.length
      ? liveNode
      : memo.multipliers.reduce((newLiveNode, multiplier) => {

          if (
            newLiveNode.order > multiplier.min &&
            newLiveNode.order < multiplier.max
          ) {

            return Object.assign({},
              newLiveNode,
              { order: newLiveNode.order + multiplier.rate }
            )

          } else {

            return newLiveNode

          }

        }, liveNode)

    const newLiveNodes = [
      ...memo.newLiveNodes,
      newLiveNode
    ]

    if (!liveNode) {

      return {
        newLiveNodes,
        multipliers: [
          ...memo.multipliers,
          {
            min: templateNode.order - 1,
            max: Infinity,
            rate: 1,
          }
        ]
      }

    } else

    if (newLiveNode.order > templateNode.order) {

      return {
        newLiveNodes,
        multipliers: [
          ...memo.multipliers,
          {
            min: -Infinity,
            max: newLiveNode.order,
            rate: 1,
          }
        ]
      }

    } else {

      return {
        newLiveNodes,
        multipliers: memo.multipliers,
      }

    }

  }, { multipliers: [], newLiveNodes: [] })

  return [ ...memo.newLiveNodes, ...liveNodes.slice(templateNodes.length) ]

}
