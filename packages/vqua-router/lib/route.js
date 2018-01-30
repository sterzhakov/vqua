const B = require('berries')
const createSegments = require('./createSegments')

const route = (path, action, props = {}, childs = []) => {

  return {
    path,
    action,
    segments: createSegments(path),
    props,
    childs: B.flatten([childs])
  }

}

module.exports = route
