const updateDomNode = require('./updateCallback')
const updateNodes = require('./updateNodes')

module.exports = ({ parentDomNode, patchNodes }) => {

  updateNodes({ patchNodes, parentDomNode, updateDomNode })

}
