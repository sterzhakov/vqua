module.exports = (liveNodes, { templateNodes, offset = 0 }) => {

  const savedLiveNodes = liveNodes.slice(0, templateNodes.length)

  const savedLiveStands = savedLiveNodes.map((uncutLiveNode, index) => {

    return { index, node: uncutLiveNode }

  })

  const sortedLiveStands = savedLiveStands.sort((prev, next) => {

    if (prev.node == null) {

      return 1

    } else

    if (next.node == null) {

      return -1

    } else {

      return prev.node.order - next.node.order

    }

  })

  const newLiveStands =
    sortedLiveStands.map((liveStand, index) => {

      if (!liveStand.node) return liveStand

      const newLiveStand = Object.assign({}, liveStand, {
        node: Object.assign({}, liveStand.node, {
          order: offset + index
        })
      })

      return newLiveStand

    })

  const newSavedLiveNodes = newLiveStands
    .sort((prev, next) => prev.index - next.index)
    .map(newLiveStand => newLiveStand.node)

  const newUnsavedLiveNodes = liveNodes
    .slice(templateNodes.length)
    .map(unsavedLiveNode => Object.assign({}, unsavedLiveNode, { order: null }))

  const newLiveNodes = [ ...newSavedLiveNodes, ...newUnsavedLiveNodes ]

  return newLiveNodes

}
