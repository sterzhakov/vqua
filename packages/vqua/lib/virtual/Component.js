const humanizeNodes = require('./humanizeNodes')
const { flatten, omit, clone, pick } = require('berries')
const countDomNodes = require('./countDomNodes')
const createLiveTree = require('./createTree')
const filterDomNodes = require('./filterDomNodes')
const getParentNodes = require('./getParentNodes')
const filterNodesOffsets = require('./filterNodesOffsets')
const createPatchTree = require('../patch/createTree')
const findDomNode = require('../dom/findDomNode')
const updateDomTree = require('../dom/updateTree')
const eachNodes = require('./eachNodes')
const { INSTANCE_TYPE, CLASS_TYPE } = require('../constants/nodeTypes')
const hookNode = require('./hookNode')
const { AFTER_DOM_CREATE } = require('../constants/hookTypes')
const mapNodes = require('./mapNodes')
const createNodesWithRefs = require('./createNodesWithRefs')

class Base {

  static defaultProps() {

    return {}

  }

  static v(props = {}, ...childs) {

    const newProps = omit(props, 'ref', 'key')

    const baseParams = {
      type: CLASS_TYPE,
      class: this,
      props: newProps,
      childs,
    }

    const refParams = props.ref
      ? { ref: props.ref }
      : {}

    const keyParams = props.key
      ? { key: props.key }
      : {}

    return Object.assign({},
      baseParams,
      refParams,
      keyParams
    )

  }

  constructor(props, context) {

    this.node = null
    this.refs = {}

    this.props = props
    this.state = {}
    this.context = context

    this.prevProps = {}
    this.prevState = {}
    this.prevContext = {}

  }


  isNeedUpdate(nextProps, nextState, nextContext) {

    return true

  }

  passContext() {

    return {}

  }

  render() {

    return null

  }

  setState(newState, callback = false) {

    const newMergedState = Object.assign({}, this.state, newState)

    const newContext = clone(this.node.context)

    const injectedContext = this.constructor.injectContext
      ? pick(newContext, ...this.constructor.injectContext())
      : {}

    if (
      !this.isNeedUpdate(this.props, newMergedState, injectedContext)
    ) return false

    if ('beforeUpdate' in this) {

      this.beforeUpdate(this.props, newMergedState, injectedContext)

    }

    this.waitAfterUpdate = true

    this.state = newMergedState

    const liveNodes = this.node.childs

    const templateNodes = createNodesWithRefs(
      flatten([ this.render() ]),
      this
    )

    const newLiveNodes =
      createLiveTree(liveNodes, templateNodes, {
        hooks: true,
        linkParent: true,
        childDomNodesCount: true,
        index: true,
        context: Object.assign({}, newContext, this.passContext()),
        liveParentNode: this.node,
        liveParentInstanceNode: this.node,
      })

    this.node.childs = newLiveNodes

    this.node.childDomNodesCount = countDomNodes(newLiveNodes)

    const filteredLiveNodes = filterDomNodes(liveNodes, this)

    const filteredTemplateNodes = filterDomNodes(newLiveNodes, this)

    const parentNodes = getParentNodes(filteredLiveNodes[0])

    const parentOffsets = filterNodesOffsets(parentNodes)

    const offset = parentOffsets[parentOffsets.length - 1]

    const boundaryDomNode = findDomNode(parentNodes[0].dom, parentOffsets)

    const domRootNode = boundaryDomNode.parentNode

    const domRootChildNodes =
      Array.from(domRootNode.childNodes)
        .slice(offset, offset + filteredLiveNodes.length)

    const patchNodes =
      createPatchTree({
        offset,
        domNodes: domRootChildNodes,
        liveNodes: filteredLiveNodes,
        templateNodes: filteredTemplateNodes,
      })

    updateDomTree({ patchNodes, parentDomNode: domRootNode })

    eachNodes([this.node], (liveNode) => {

      if (liveNode.type == INSTANCE_TYPE) {

        hookNode(AFTER_DOM_CREATE, liveNode, null, null)

      }

    })


  }

}

module.exports = Base
