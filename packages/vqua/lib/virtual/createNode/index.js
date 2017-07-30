const createRootNode = require('./createRootNode')
const createInstanceNode = require('./createInstanceNode')
const updateInstanceNode = require('./updateInstanceNode')
const createTagNode = require('./createTagNode')
const createTextNode = require('./createTextNode')
const handleError = require('../../helpers/handleError')

const {
  CREATE_ROOT, CREATE_TEXT, CREATE_TAG,
  CREATE_INSTANCE, UPDATE_INSTANCE, RESUME_INSTANCE
} = require('../../constants/createNodeTypes')

module.exports = ({
  type = null,
  liveNode = null,
  templateNode = null,
  context = null,
  beforeRender = null,
}, callback) => {

  switch (type) {

    case CREATE_ROOT: {

      const newRootNode = createRootNode({ templateNode })

      return newRootNode

    }

    case CREATE_INSTANCE: {

      const newLiveNode =
        createInstanceNode({
          templateNode,
          context,
          beforeRender,
        })

      if (templateNode.ref) {

        templateNode.ref.instance.refs =
          Object.assign({}, templateNode.ref.instance.refs, {
            [templateNode.ref.name]: newLiveNode.instance
          })

      }

      return newLiveNode

    }

    case UPDATE_INSTANCE: {

      const newLiveNode =
        updateInstanceNode({
          liveNode,
          templateNode,
          context
        })

      return newLiveNode

    }

    case RESUME_INSTANCE: {

      return liveNode

    }

    case CREATE_TAG: {

      const newTagNode = createTagNode({ templateNode })

      return newTagNode

    }

    case CREATE_TEXT: {

      const newTextNode = createTextNode({ templateNode })

      return newTextNode

    }

    default: {

      throw new Error('Unrecognized create node type')

    }

  }


}
