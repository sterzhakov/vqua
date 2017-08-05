module.exports = ({ templateNode }) => {

  const refParams =
    templateNode.ref
      ? { ref: templateNode.ref }
      : {}

    if (templateNode.tag == 'code') {

      // console.log(templateNode)

    }

  const newTagNode = {
    type: templateNode.type,
    tag: templateNode.tag,
    props: templateNode.props,
    childs: templateNode.childs,
  }

  return Object.assign({}, newTagNode, refParams)

}
