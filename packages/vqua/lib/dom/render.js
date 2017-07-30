const { flatten } = require('vqua-utils')
const { ROOT_TYPE, INSTANCE_TYPE } = require('../constants/nodeTypes')
const createLiveTree = require('../virtual/createTree')
const filterDomNodes = require('../virtual/filterDomNodes')
const eachNodes = require('../virtual/eachNodes')
const hookNode = require('../virtual/hookNode')
const { AFTER_DOM_CREATE } = require('../constants/hookTypes')
const createPatchTree = require('../patch/createTree')
const updateDomTree = require('../dom/updateTree')

module.exports = (parentDomNode, liveNodes, templateNodes, context = {}) => {

  const templateNodesWithRoot = [
    {
      type: ROOT_TYPE,
      dom: parentDomNode,
      childs: flatten([templateNodes]),
    }
  ]

  const newLiveNodes =
    createLiveTree(
      liveNodes,
      templateNodesWithRoot,
      {
        hooks: true,
        context,
      }
    )

  const templateDomNodes =
    filterDomNodes(newLiveNodes)

  const patchNodes =
    createPatchTree({
      offset: 0,
      liveNodes: [],
      templateNodes: templateDomNodes,
      domNodes: [],
    })

  parentDomNode.innerHTML = ''

  updateDomTree({
    patchNodes,
    parentDomNode
  })

  eachNodes(newLiveNodes, (liveNode) => {

    if (liveNode.type == INSTANCE_TYPE) {

      hookNode(AFTER_DOM_CREATE, liveNode, null, null)

    }

  })

  return newLiveNodes

}
