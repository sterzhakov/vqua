const B = require('berries')
const createNode = require('../createNode')
const hookNode = require('../hookNode')
const getCreateAction = require('../getCreateAction')
const handleError = require('../../helpers/handleError')
const mapNodes = require('../mapNodes')

const {
  BEFORE_EACH_ITERATION, BEFORE_INSTANCE_UPDATE, ON_INSTANCE_CREATE
} = require('../../constants/hookTypes')

const {
  CREATE_ROOT, CREATE_TEXT, CREATE_TAG,
  CREATE_INSTANCE, UPDATE_INSTANCE, RESUME_INSTANCE
} = require('../../constants/createNodeTypes')

const { CLASS_TYPE } = require('../../constants/nodeTypes')

module.exports = ({
  index,
  liveNode,
  templateNode,
  liveParentInstanceNode,
  options = {
    hooks: false,
  },
  context = {},
}) => {

  const newTemplateNode = templateNode && templateNode.type == CLASS_TYPE
    ? Object.assign({},
        templateNode,
        {
          props: Object.assign({},
            templateNode.props,
            {
              childs: mapNodes(templateNode.childs, node => {

                return Object.assign({}, node, { isChildFromProps: true })

              }) || []
            }
          )
        }
      )
    : templateNode

  const injectedContext = (
    newTemplateNode &&
    newTemplateNode.type == CLASS_TYPE &&
    newTemplateNode.class.injectContext
  ) ? B.pick(context, ... newTemplateNode.class.injectContext())
    : {}

  if (options.hooks) {
    hookNode(
      BEFORE_EACH_ITERATION,
      liveNode,
      newTemplateNode,
      injectedContext
    )
  }

  const createAction = getCreateAction(liveNode, newTemplateNode, injectedContext)

  switch (createAction) {

    case CREATE_ROOT: {

      const newLiveNode =
        createNode({
          type: CREATE_ROOT,
          liveNode,
          templateNode: newTemplateNode,
        })

      return {
        newLiveNode,
        isNeedChilds: true,
        newContext: context,
        templateChilds: newLiveNode ? newLiveNode.childs : [],
        liveChilds: liveNode ? liveNode.childs : [],
        newLiveParentInstanceNode: liveParentInstanceNode,
      }

    }

    case CREATE_INSTANCE: {

      const newLiveNode =
        createNode({
          type: CREATE_INSTANCE,
          liveNode,
          templateNode: newTemplateNode,
          context,
          injectedContext,
          beforeRender: (instance) => {

            if (options.hooks) {
              hookNode(
                ON_INSTANCE_CREATE,
                { instance }
              )
            }

          }
        })

      const newContext =
        Object.assign(
          {},
          context,
          newLiveNode.instance.passContext()
        )

      return {
        newLiveNode,
        isNeedChilds: true,
        newContext,
        liveChilds: liveNode ? liveNode.childs : [],
        templateChilds: newLiveNode ? newLiveNode.childs : [],
        newLiveParentInstanceNode: newLiveNode,
      }

    }

    case UPDATE_INSTANCE: {

      if (options.hooks) {
        hookNode(
          BEFORE_INSTANCE_UPDATE,
          liveNode,
          newTemplateNode,
          injectedContext
        )
      }

      const newLiveNode =
        createNode({
          type: UPDATE_INSTANCE,
          liveNode,
          templateNode: newTemplateNode,
          injectedContext,
          context,
        })

      const newContext =
        Object.assign(
          {},
          context,
          newLiveNode.instance.passContext()
        )

      return {
        newLiveNode,
        isNeedChilds: true,
        newContext,
        liveChilds: liveNode && liveNode.childs || [],
        templateChilds: newLiveNode.childs,
        newLiveParentInstanceNode: newLiveNode,
      }

    }

    case RESUME_INSTANCE: {

      const newLiveNode =
        createNode({
          type: RESUME_INSTANCE,
          liveNode,
          templateNode: newTemplateNode,
        })

      return {
        newLiveNode,
        isNeedChilds: false,
        newContext: context,
        newLiveParentInstanceNode: newLiveNode,
      }

    }

    case CREATE_TAG: {

      const newLiveNode =
        createNode({
          type: CREATE_TAG,
          liveNode,
          templateNode: newTemplateNode,
        })

      return {
        newLiveNode,
        newContext: context,
        isNeedChilds: true,
        liveChilds: liveNode ? liveNode.childs : [],
        templateChilds: newTemplateNode ? newTemplateNode.childs : [],
        newLiveParentInstanceNode: liveParentInstanceNode,
      }

    }

    case CREATE_TEXT: {

      const newLiveNode =
        createNode({
          type: CREATE_TEXT,
          liveNode,
          templateNode: newTemplateNode,
        })

      return {
        newLiveNode,
        isNeedChilds: false,
        newContext: context,
        newLiveParentInstanceNode: liveParentInstanceNode,
      }

      break
    }

    default: {

      return {
        newLiveNode: null,
        isNeedChilds: false,
        newContext: context,
        newLiveParentInstanceNode: null,
      }

    }

  }


}
