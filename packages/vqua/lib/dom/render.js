const { flatten } = require('vqua-utils')
const { ROOT_TYPE, INSTANCE_TYPE } = require('../constants/nodeTypes')
const createLiveTree = require('../virtual/createTree')
const filterDomNodes = require('../virtual/filterDomNodes')
const eachNodes = require('../virtual/eachNodes')
const hookNode = require('../virtual/hookNode')
const { AFTER_DOM_CREATE } = require('../constants/hookTypes')
const createPatchTree = require('../patch/createTree')
const updateDomTree = require('../dom/updateTree')
const dom2vqua = require('dom2vqua')
const humanizeNodes = require('../virtual/humanizeNodes')

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

  const templateDomNodes = filterDomNodes(newLiveNodes)

  const liveDomNodes = liveNodes.length == 0
    ? dom2vqua(parentDomNode.childNodes)
    : filterDomNodes(liveNodes)

  const patchNodes =
    createPatchTree({
      offset: 0,
      liveNodes: liveDomNodes,
      templateNodes: templateDomNodes,
      domNodes: Array.from(parentDomNode.childNodes),
    })

  updateDomTree({ patchNodes, parentDomNode })

  eachNodes(newLiveNodes, (liveNode) => {

    if (liveNode.type == INSTANCE_TYPE) {

      hookNode(AFTER_DOM_CREATE, liveNode, null, null)

    }

  })

  return newLiveNodes

}
