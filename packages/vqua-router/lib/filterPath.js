module.exports = (path = '') => {

  const afterHash = /#(.*)/

  return path.replace(afterHash, '')

}
