const path2segments = require('./path2segments')

module.exports = (path, action, props = {}, childs = []) => {

  const segments = (typeof path == 'string')
    ? path2segments(path)
    : path

  return { path, action, segments, props, childs }

}
