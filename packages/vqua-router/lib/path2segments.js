module.exports = (path) => {

  const boundarySlashes = /^\/+|\/+$/g

  return path.replace(boundarySlashes, '').split('/')

}
