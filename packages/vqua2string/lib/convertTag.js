const { include } = require('berries')
const singleTags = require('./singleTags')
const events = require('vqua/lib/dom/events')

module.exports = (node, childs) => {

  const keys = Object.keys(node.props)

  const props = keys.reduce((string, key, index) => {

    return (key in events)
      ? string
      : string + ' ' + `${key}="${node.props[key]}"`

  }, '')

  const openTag = `<${node.tag}${props}>`

  return (include(singleTags, node.tag))
    ? openTag
    : openTag + childs + `</${node.tag}>`

}
