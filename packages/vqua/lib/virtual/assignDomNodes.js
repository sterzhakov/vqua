const loop = ({ liveNodes, domNodes }) => {

  liveNodes.forEach((liveNode, index) => {

    liveNode.dom = domNodes[index]

    if (liveNode.childs) {

      loop({
        liveNodes: liveNode.childs,
        domNodes: domNodes[index].childNodes
      })

    }

  })

}

module.exports = loop
