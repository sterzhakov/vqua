const { inspect } = require('util')
const { html2json } = require('html2json')
const createNode = require('./createNode')
const mapNodes = require('./mapNodes')


module.exports = (string) => {

  if (typeof string != 'string') return null

  const htmlNodes = html2json(string)

  const vquaNodes = mapNodes(htmlNodes.child, createNode)

  return vquaNodes

}
