const { TEXT_TYPE, TAG_TYPE } = require('../constants/nodeTypes')
const sortProps = require('./sortProps')
const events = require('./events')
const diffProps = require('./diffProps')

const updateProps = (
  domNode, liveProps, templateProps, { event = true, element = true } = {}
) => {

  const sortedLiveProps = sortProps(liveProps)
  const sortedTemplateProps = sortProps(templateProps)

  if (element) {

    updateElementProps(
      domNode,
      sortedLiveProps.elementProps,
      sortedTemplateProps.elementProps
    )

  }

  if (event) {

    updateEventProps(
      domNode,
      sortedLiveProps.eventProps,
      sortedTemplateProps.eventProps
    )

  }

}

const updateEventProps = (domNode, liveProps, templateProps) => {

  const { addProps, removeProps } = diffProps(liveProps, templateProps)

  addProps.forEach(prop => addEventProp(domNode, prop))
  removeProps.forEach(prop => removeEventProp(domNode, prop))

}

const updateElementProps = (domNode, liveProps, templateProps) => {

  const { addProps, removeProps } = diffProps(liveProps, templateProps)

  addProps.forEach((prop) => {

    const isPropsForAdd = (
      typeof prop.value == 'string' ||
      typeof prop.value == 'number' ||
      prop.value == true
    )

    if (isPropsForAdd) {

      const booleanProp = (prop.value === true) ? { value: '' } : {}

      const filteredProp = Object.assign({}, prop, booleanProp)

      addElementProp(domNode, filteredProp)

    } else {

      removeElementProp(domNode, prop)

    }

  })

  removeProps.forEach(prop => removeElementProp(domNode, prop))

}

const addElementProp = (domNode, prop) => {

  domNode.setAttribute(prop.key, prop.value)

}

const removeElementProp = (domNode, prop) => {

  domNode.removeAttribute(prop.key)

}

const addEventProp = (domNode, prop) => {

  domNode.addEventListener(events[prop.key], prop.value)

}

const removeEventProp = (domNode, prop) => {

  domNode.removeEventListener(events[prop.key], prop.value)

}

const createElement = (templateNode) => {

  switch (templateNode.type) {

    case TAG_TYPE: {

      const element = document.createElement(templateNode.tag)

      updateProps(element, {}, templateNode.props)

      return element
    }

    case TEXT_TYPE: {

      const element = document.createTextNode(templateNode.text)

      return element
    }

    default: {

      throw new Error('Unknown template node type:', templateNode.type)

    }

  }

}

const insertAt = (domNode, parentDomNode, order) => {

  const beforeDomNode =
    parentDomNode.childNodes[order]
      ? parentDomNode.childNodes[order]
      : parentDomNode.childNodes[parentDomNode.childNodes.length]

  parentDomNode.insertBefore(domNode, beforeDomNode)

}

module.exports = {
  updateProps,
  updateEventProps,
  updateElementProps,
  addElementProp,
  removeElementProp,
  addEventProp,
  removeEventProp,
  createElement,
  insertAt
}
