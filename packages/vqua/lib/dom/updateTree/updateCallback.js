const { addRef, removeRef } = require('../../virtual/refs')
const { createElement, insertAt, updateProps } = require('../domActions')
const sortProps = require('../sortProps')
const isPropsEqual = require('../isPropsEqual')
const {
  CREATE_NODE, UPDATE_NODE, DELETE_NODE, REPLACE_NODE, INSERT_NODE
} = require('../../constants/actionTypes')
const { TEXT_TYPE } = require('../../constants/nodeTypes')

module.exports = ({
  actions,
  templateNode = null,
  liveNode = null,
  parentDomNode = null
}) => {

  if (actions.length == 0) return null

  const domNodes = actions.reduce((domNodes, action) => {

    switch (action) {

      case CREATE_NODE: {

        const newDom = createElement(templateNode)

        insertAt(newDom, parentDomNode, templateNode.order)

        if (templateNode.ref) {

          addRef(templateNode, newDom)

        }

        return [ ...domNodes, newDom ]

        break
      }

      case UPDATE_NODE: {

        if (liveNode.type == TEXT_TYPE) {

          liveNode.dom.nodeValue = templateNode.text

        } else {

          const liveInstanceId = (
            liveNode &&
            liveNode.instance &&
            liveNode.instance.node.instanceId
          )

          const templateInstanceId = (
            templateNode &&
            templateNode.instance &&
            templateNode.instance.node.instanceId
          )

          updateProps(
            liveNode.dom,
            liveNode.props,
            templateNode.props,
            (leftValue, rightValue, isFunctions) => {

              return (isFunctions && liveInstanceId != templateInstanceId)
                ? false
                : isPropsEqual(leftValue, rightValue)

            }
          )

          if (templateNode.ref) {

            addRef(templateNode, liveNode.dom)

          }

        }

        return [ ...domNodes, liveNode.dom ]

        break
      }

      case DELETE_NODE: {

        parentDomNode.removeChild(liveNode.dom)

        if (liveNode.ref) {

          removeRef(liveNode)

        }

        return domNodes

        break
      }

      case REPLACE_NODE: {

        const newDom = createElement(templateNode)

        if (templateNode.ref) {

          addRef(templateNode, newDom)

        } else

        if (liveNode.ref && !templateNode.ref) {

          removeRef(liveNode)

        }

        parentDomNode.replaceChild(newDom, liveNode.dom)

        return [ ...domNodes, newDom ]

        break
      }

      case INSERT_NODE: {

        insertAt(liveNode.dom, parentDomNode, liveNode.order)

        return [ ...domNodes, liveNode.dom ]

        break
      }

      default: {

        throw new Error('Unknown action type.')

      }

    }

  }, [])

  return domNodes[domNodes.length - 1] || null

}
