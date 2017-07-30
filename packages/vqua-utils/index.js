
let modules = {}

const names = [
  'asyncMap',
  'clone',
  'flatten',
  'include',
  'kindOf',
  'pick',
  'omit',
  'union',
  'capitalize',
  'classNames',
  'first',
  'last',
  'intersect',
  'times',
  'findRightIndex',
  'compose'
]

names.forEach((name) => {
  modules[name] = require('./lib/' + name)
})

module.exports = modules
