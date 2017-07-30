const { include } = require('vqua-utils')
const singleTags = require('./singleTags')

module.exports = (node, childs) => {

  const keys = Object.keys(node.props)

  const props = keys.reduce((string, key, index) => {

    return string + ' ' + `${key}="${node.props[key]}"`

  }, '')

  const openTag = `<${node.tag}${props}>`

  return (include(singleTags, node.tag))
    ? openTag
    : openTag + childs + `</${node.tag}>`

}
